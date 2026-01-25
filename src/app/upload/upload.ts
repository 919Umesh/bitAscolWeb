
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResourcesService } from '../services/api/resources';
import { StorageService } from '../services/api/storage';
import { environment } from '../../environments/environment';

type ResourceType = 'question' | 'note' | 'syllabus';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.css']
})
export class Upload implements OnInit {

  semesters: any[] = [];
  subjects: any[] = [];


  form!: FormGroup;
  newSemesterForm!: FormGroup;
  newSubjectForm!: FormGroup;


  loading = false;
  selectedFile!: File;
  showAddSemester = false;
  showAddSubject = false;


  editMode = false;
  resourceId: string | null = null;
  currentFileDoc: any | null = null;
  currentFileId: string | null = null;


  resourceTypeOptions: ResourceType[] = ['question', 'note', 'syllabus'];



  noticeForm!: FormGroup;
  selectedNoticeFile?: File;
  submittingNotice = false;

  galleryForm!: FormGroup;
  selectedGalleryFile?: File;
  uploadingGallery = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private resourceService: ResourcesService,
    private storageService: StorageService
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls as any;
  }

  async ngOnInit() {
    this.form = this.fb.group({
      semester: ['', Validators.required],
      subject: ['', Validators.required],
      resource_type: ['note', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(120)]],
      description: [''],
      year: [null]
    });


    this.newSemesterForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(64)]],
      code: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      description: ['', [Validators.maxLength(500)]],
    });
    this.newSubjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      code: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.maxLength(1000)]],
    });

    await this.loadSemesters();


    this.form.get('semester')!.valueChanges.subscribe(async (semesterId: string) => {
      this.form.patchValue({ subject: '' });
      this.subjects = [];
      this.showAddSubject = false;
      if (!semesterId) return;
      await this.loadSubjects(semesterId);
    });


    this.resourceId = this.route.snapshot.paramMap.get('id');
    if (this.resourceId) {
      this.editMode = true;
      await this.loadForEdit(this.resourceId);
    }




    this.noticeForm = this.fb.group({
      topic: [''] // no validators since you want simple not-empty check
    });



    this.galleryForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(160)]],
    });



  }

  private async loadSemesters() {
    try {
      const res = await this.resourceService.getAllSemesters();
      this.semesters = res.data || [];
      this.showAddSemester = this.semesters.length === 0;
    } catch (e) {
      console.error('Failed to load semesters', e);
      this.semesters = [];
      this.showAddSemester = true;
      alert('Failed to load semesters.');
    }
  }

  private async loadSubjects(semesterId: string) {
    try {
      const res = await this.resourceService.getSubjectsBySemester(semesterId);
      this.subjects = res.data || [];
      this.showAddSubject = this.subjects.length === 0 && !!semesterId;
    } catch (e) {
      console.error('Failed to load subjects', e);
      this.subjects = [];
      this.showAddSubject = true;
      alert('Failed to load subjects.');
    }
  }

  toggleAddSemester() {
    this.showAddSemester = !this.showAddSemester;
  }

  async createSemester() {
    if (this.newSemesterForm.invalid) {
      this.newSemesterForm.markAllAsTouched();
      return;
    }
    const { name, code, description } = this.newSemesterForm.value;

    this.loading = true;
    try {
      const created = await this.resourceService.createDocument('semesters', {
        name,
        code: Number(code),
        description: description ?? '',
      });

      await this.loadSemesters();
      const createdId = (created as any).$id;
      this.form.patchValue({ semester: createdId });
      await this.loadSubjects(createdId);

      this.newSemesterForm.reset();
      this.showAddSemester = false;
    } catch (err) {
      console.error('Failed to create semester', err);
      alert('Failed to create semester');
    } finally {
      this.loading = false;
    }
  }

  toggleAddSubject() {
    this.showAddSubject = !this.showAddSubject;
  }

  async createSubject() {
    if (!this.form.value.semester) {
      alert('Please select or create a semester first.');
      return;
    }
    if (this.newSubjectForm.invalid) {
      this.newSubjectForm.markAllAsTouched();
      return;
    }

    const semesterId = this.form.value.semester as string;
    const { name, code, description } = this.newSubjectForm.value;

    this.loading = true;
    try {
      const created = await this.resourceService.createDocument('subjects', {
        name,
        code,
        description: description ?? '',
        semesters: semesterId
      });

      await this.loadSubjects(semesterId);
      const createdId = (created as any).$id;
      this.form.patchValue({ subject: createdId });

      this.newSubjectForm.reset();
      this.showAddSubject = false;
    } catch (err) {
      console.error('Failed to create subject', err);
      alert('Failed to create subject');
    } finally {
      this.loading = false;
    }
  }


  private async loadForEdit(resourceId: string) {
    try {

      const resourceWithFiles = await (this.resourceService as any).getResourceWithFiles(resourceId);
      const resource = resourceWithFiles as any;


      this.currentFileDoc = (resourceWithFiles.files && resourceWithFiles.files.length)
        ? resourceWithFiles.files[0]
        : null;


      const subjectId = resource.subjects;
      const subjectDoc = await (this.resourceService as any).getSubjectById(subjectId);
      const semesterId = subjectDoc.semesters;


      await this.loadSemesters();
      this.form.patchValue({ semester: semesterId });
      await this.loadSubjects(semesterId);

      this.form.patchValue({
        subject: subjectId,
        resource_type: resource.resource_type as ResourceType,
        title: resource.title,
        description: resource.description ?? '',
        year: resource.year ?? null
      });


      if (this.currentFileDoc?.file_url) {
        this.currentFileId = this.storageService.extractFileIdFromViewUrl(this.currentFileDoc.file_url);
      } else {
        this.currentFileId = null;
      }
    } catch (e) {
      console.error('Failed to load resource for edit', e);
      alert('Failed to load resource for edit.');
    }
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      this.selectedFile = undefined as any;
      return;
    }

    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowed.includes(file.type)) {
      alert('Only PDF, DOC, or DOCX files are allowed.');
      return;
    }

    this.selectedFile = file;
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Please fill required fields.');
      return;
    }
    if (!this.editMode && !this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    this.loading = true;

    try {
      if (this.editMode && this.resourceId) {
        await this.updateExistingResource(this.resourceId);
      } else {
        await this.createNewResource();
      }

      alert(this.editMode ? '✅ Resource updated successfully' : '✅ Resource created successfully');

      if (!this.editMode) {
        this.form.reset({ resource_type: 'note' });
        this.subjects = [];
        this.selectedFile = undefined as any;
        if (this.semesters.length === 0) this.showAddSemester = true;
      }
    } catch (error) {
      console.error(error);
      alert('❌ Operation failed');
    } finally {
      this.loading = false;
    }
  }

  private async createNewResource() {
    const resource = await this.resourceService.createDocument('resources', {
      title: this.form.value.title,
      description: this.form.value.description,
      resource_type: this.form.value.resource_type as ResourceType,
      subjects: this.form.value.subject,
      year: this.form.value.year ?? null,
    });

    const uploaded = await this.storageService.uploadFile(
      environment.appwrite.bucketId,
      this.selectedFile
    );
    const fileId = (uploaded as any).$id;


    const viewUrl = this.storageService.getFileViewUrl(
      environment.appwrite.bucketId,
      fileId
    );


    await this.resourceService.createDocument('resource_files', {
      file_title: this.form.value.title,
      file_url: viewUrl,
      resources: (resource as any).$id,
    });
  }

  private async updateExistingResource(resourceId: string) {
    await this.resourceService.updateDocument('resources', resourceId, {
      title: this.form.value.title,
      description: this.form.value.description,
      resource_type: this.form.value.resource_type as ResourceType,
      subjects: this.form.value.subject,
      year: this.form.value.year ?? null,
    });

    if (this.selectedFile) {
      const oldFileId =
        this.currentFileId ??
        (this.currentFileDoc?.file_url
          ? this.storageService.extractFileIdFromViewUrl(this.currentFileDoc.file_url)
          : null);

      if (oldFileId) {
        try {
          await this.storageService.deleteFile(environment.appwrite.bucketId, oldFileId);
        } catch (e) {
          console.warn('Could not delete old file (ok to ignore if not found):', e);
        }
      }

      const uploaded = await this.storageService.uploadFile(
        environment.appwrite.bucketId,
        this.selectedFile
      );
      const newFileId = (uploaded as any).$id;
      const newUrl = this.storageService.getFileViewUrl(
        environment.appwrite.bucketId,
        newFileId
      );

      if (this.currentFileDoc?.$id) {
        await this.resourceService.updateDocument('resource_files', this.currentFileDoc.$id, {
          file_title: this.form.value.title,
          file_url: newUrl,
        });
      } else {
        await this.resourceService.createDocument('resource_files', {
          file_title: this.form.value.title,
          file_url: newUrl,
          resources: resourceId
        });
      }

      this.currentFileId = newFileId;
      this.currentFileDoc = {
        ...(this.currentFileDoc ?? {}),
        $id: this.currentFileDoc?.$id ?? undefined,
        file_title: this.form.value.title,
        file_url: newUrl
      };
    } else {
      if (this.currentFileDoc?.$id) {
        await this.resourceService.updateDocument('resource_files', this.currentFileDoc.$id, {
          file_title: this.form.value.title
        });
      }
    }
  }





  onNoticeFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement | null;
    const file = input?.files?.[0] ?? undefined;

    if (!file) {
      this.selectedNoticeFile = undefined;
      return;
    }

    const isPdfByMime = file.type === 'application/pdf';
    const isPdfByExt = /\.pdf$/i.test(file.name);

    if (!isPdfByMime && !isPdfByExt) {
      alert('Please select a PDF file (.pdf).');
      this.selectedNoticeFile = undefined;
      return;
    }

    this.selectedNoticeFile = file;
  }



  async postNoticeWithFile() {
    const rawTopic = this.noticeForm.get('topic')?.value ?? '';
    const topic = String(rawTopic).trim();

    if (!topic) {
      this.noticeForm.get('topic')?.markAsTouched();
      alert('Please enter topic.');
      return;
    }

    if (!this.selectedNoticeFile) {
      alert('Please choose a PDF file.');
      return;
    }

    this.submittingNotice = true;
    try {
      const up = await this.storageService.uploadFile(
        environment.appwrite.bucketId,
        this.selectedNoticeFile
      );
      const fileId = (up as any).$id;

      const viewUrl = this.storageService.getFileViewUrl(
        environment.appwrite.bucketId,
        fileId
      );


      await this.resourceService.createDocument('notices', {
        topic,
        file: viewUrl
      });

      alert('✅ Notice posted');
      this.noticeForm.reset();
      this.selectedNoticeFile = undefined;
    } catch (e) {
      console.error('Failed to post notice', e);
      alert('❌ Failed to post notice');
    } finally {
      this.submittingNotice = false;
    }
  }


  onGalleryFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      this.selectedGalleryFile = undefined;
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (jpeg, png, webp, etc.).');
      return;
    }
    this.selectedGalleryFile = file;
  }



  async uploadGalleryImage() {
    if (this.galleryForm.invalid || !this.selectedGalleryFile) {
      this.galleryForm.markAllAsTouched();
      alert('Please enter a title and choose an image.');
      return;
    }

    this.uploadingGallery = true;
    try {
      const up = await this.storageService.uploadFile(
        environment.appwrite.bucketId,
        this.selectedGalleryFile
      );
      const fileId = (up as any).$id;

      const viewUrl = this.storageService.getFileViewUrl(
        environment.appwrite.bucketId,
        fileId
      );

      const { title } = this.galleryForm.value;
      await this.resourceService.createDocument('gallery', {
        title,
        file_url: viewUrl
      });

      alert('✅ Photo added to Gallery');
      this.galleryForm.reset();
      this.selectedGalleryFile = undefined;
    } catch (e) {
      console.error('Failed to upload sgallery image', e);
      alert('❌ Failed to upload image');
    } finally {
      this.uploadingGallery = false;
    }
  }


}
``
