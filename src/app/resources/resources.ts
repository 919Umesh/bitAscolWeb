import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SemesterModel, SubjectModel, ResourceModel, ResourceWithFiles } from '../models/resources';
import { ResourcesService } from '../services/api/resources';


@Component({
  selector: 'app-resources',
  imports: [CommonModule, FormsModule],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
})
export class Resources implements OnInit { 
  semesters: SemesterModel[] = [];
  subjects: SubjectModel[] = [];
  resources: ResourceModel[] = [];
  
  selectedSemester: SemesterModel | null = null;
  selectedSubject: SubjectModel | null = null;
  selectedResourceType: 'question' | 'note' | 'syllabus' | null = null;
  
  // Store resources for all types
  allResources: { [key: string]: ResourceModel[] } = {
    question: [],
    note: [],
    syllabus: []
  };
  
  loading = false;
  error = '';

  // Resource types array
  resourceTypes: ('question' | 'note' | 'syllabus')[] = ['question', 'note', 'syllabus'];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit() {
    this.loadSemesters();
  }

  async loadSemesters() {
    try {
      this.loading = true;
      this.error = '';
      const response = await this.resourcesService.getAllSemesters();
      this.semesters = response.data;
    } catch (error: any) {
      this.error = error.message;
      console.error('Error loading semesters:', error);
    } finally {
      this.loading = false;
    }
  }

  async selectSemester(semester: SemesterModel) {
    this.selectedSemester = semester;
    this.selectedSubject = null;
    this.resources = [];
    this.selectedResourceType = null;
    this.clearAllResources();
    
    try {
      this.loading = true;
      this.error = '';
      const response = await this.resourcesService.getSubjectsBySemester(semester.$id);
      this.subjects = response.data;
    } catch (error: any) {
      this.error = error.message;
      console.error('Error loading subjects:', error);
    } finally {
      this.loading = false;
    }
  }

  async selectSubject(subject: SubjectModel) {
    this.selectedSubject = subject;
    this.resources = [];
    this.selectedResourceType = null;
    this.clearAllResources();
    
    await this.loadAllResourceTypes();
  }

  async selectResourceType(resourceType: 'question' | 'note' | 'syllabus') {
    this.selectedResourceType = resourceType;
    this.resources = this.allResources[resourceType];
  }

  async loadAllResourceTypes() {
    if (!this.selectedSubject) return;
    
    try {
      this.loading = true;
      this.error = '';
    
      const [questionsResponse, notesResponse, syllabusResponse] = await Promise.all([
        this.resourcesService.getResourcesBySubjectAndType(this.selectedSubject.$id, 'question'),
        this.resourcesService.getResourcesBySubjectAndType(this.selectedSubject.$id, 'note'),
        this.resourcesService.getResourcesBySubjectAndType(this.selectedSubject.$id, 'syllabus')
      ]);
      
    
      this.allResources['question'] = questionsResponse.data;
      this.allResources['note'] = notesResponse.data;
      this.allResources['syllabus'] = syllabusResponse.data;
      
    } catch (error: any) {
      this.error = error.message;
      console.error('Error loading resources:', error);
    } finally {
      this.loading = false;
    }
  }

  private clearAllResources() {
    this.allResources = {
      question: [],
      note: [],
      syllabus: []
    };
  }

  backToSemesters() {
    this.selectedSemester = null;
    this.selectedSubject = null;
    this.resources = [];
    this.selectedResourceType = null;
    this.clearAllResources();
  }

  backToSubjects() {
    this.selectedSubject = null;
    this.resources = [];
    this.selectedResourceType = null;
    this.clearAllResources();
  }

  backToResourceTypes() {
    this.resources = [];
    this.selectedResourceType = null;
  }

  getSelectedSemesterName(): string {
    return this.selectedSemester ? this.selectedSemester.name : '';
  }

  getSelectedSubjectName(): string {
    return this.selectedSubject ? this.selectedSubject.name : '';
  }

  getResourceTypeDisplayName(): string {
    switch (this.selectedResourceType) {
      case 'question': return 'Question Papers';
      case 'note': return 'Study Notes';
      case 'syllabus': return 'Syllabus';
      default: return 'Resources';
    }
  }

  getResourceCount(resourceType: 'question' | 'note' | 'syllabus'): number {
    return this.allResources[resourceType]?.length || 0;
  }


  async downloadResource(resourceId: string) {
    try {
      const resourceWithFiles: ResourceWithFiles = await this.resourcesService.getResourceWithFiles(resourceId);
      
      if (resourceWithFiles.files && resourceWithFiles.files.length > 0) {
        const file = resourceWithFiles.files[0];
        window.open(file.file_url, '_blank');
      } else {
        this.error = 'No files found for this resource';
      }
    } catch (error: any) {
      this.error = 'Failed to download resource: ' + error.message;
      console.error('Error downloading resource:', error);
    }
  }


  resetSelections() {
    this.selectedSemester = null;
    this.selectedSubject = null;
    this.selectedResourceType = null;
    this.subjects = [];
    this.resources = [];
    this.clearAllResources();
    this.error = '';
  }
}