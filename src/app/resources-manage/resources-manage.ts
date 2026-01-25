import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResourcesService } from '../services/api/resources';

type ResourceType = 'question' | 'note' | 'syllabus';

@Component({
  selector: 'app-resources-manage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './resources-manage.html',
  styleUrls: ['./resources-manage.css'],
})
export class ResourcesManageComponent implements OnInit {
  filterForm!: FormGroup;

  semesters: any[] = [];
  subjects: any[] = [];
  subjectMap = new Map<string, any>(); 

  loading = false;
  rows: any[] = [];

  resourceTypeOptions: ResourceType[] = ['question', 'note', 'syllabus'];

  constructor(
    private fb: FormBuilder,
    private resourcesService: ResourcesService
  ) {}

  async ngOnInit() {
    this.filterForm = this.fb.group({
      semester: [''],
      subject: [''],
      resource_type: ['note', Validators.required], 
    });

    await this.loadSemesters();

    this.filterForm.get('semester')!.valueChanges.subscribe(async (semesterId: string) => {
      this.filterForm.patchValue({ subject: '' }, { emitEvent: false });
      this.subjects = [];
      this.subjectMap.clear();
      if (semesterId) await this.loadSubjects(semesterId);
      this.rows = [];
    });

    this.filterForm.valueChanges.subscribe(async () => {
      await this.search();
    });
  }

  private async loadSemesters() {
    try {
      const res = await this.resourcesService.getAllSemesters();
      this.semesters = res.data || [];
    } catch (e) {
      console.error('Failed to load semesters', e);
      this.semesters = [];
      alert('Failed to load semesters.');
    }
  }

  private async loadSubjects(semesterId: string) {
    try {
      const res = await this.resourcesService.getSubjectsBySemester(semesterId);
      this.subjects = res.data || [];
      this.subjectMap.clear();
      for (const s of this.subjects) this.subjectMap.set(s.$id, s);
    } catch (e) {
      console.error('Failed to load subjects', e);
      this.subjects = [];
      alert('Failed to load subjects.');
    }
  }

  async search() {
    const { subject, resource_type } = this.filterForm.value;
    if (!subject || !resource_type) {
      this.rows = [];
      return;
    }

    this.loading = true;
    try {
      const res = await this.resourcesService.getResourcesBySubjectAndType(
        subject,
        resource_type,
        200
      );
      this.rows = res.data || [];
    } catch (e) {
      console.error('Failed to fetch resources', e);
      alert('Failed to fetch resources.');
      this.rows = [];
    } finally {
      this.loading = false;
    }
  }

  subjectName(subjectId: string): string {
    return this.subjectMap.get(subjectId)?.name ?? subjectId;
  }

  subjectCode(subjectId: string): string {
    return this.subjectMap.get(subjectId)?.code ?? '';
  }

  trackById = (_: number, r: any) => r.$id;
}
