// services/resources.service.ts
import { Injectable } from '@angular/core';
import { Query } from 'appwrite';
import { AppwriteBaseService } from '../appwrite';
import {
  SemesterModel,
  SubjectModel,
  ResourceModel,
  ResourceFileModel,
  SemestersResponse,
  SubjectsResponse,
  ResourcesResponse,
  ResourceWithFiles
} from '../../models/resources';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService extends AppwriteBaseService {
  
  // ==================== SEMESTERS ====================
  async getAllSemesters(): Promise<SemestersResponse> {
    try {
      const result = await this.listDocuments('semesters', [
        Query.orderAsc('code') 
      ]);
      
      const semesters = result.documents as unknown as SemesterModel[];
      
      return {
        data: semesters,
        message: 'Semesters retrieved successfully',
        total: result.total
      };
    } catch (error) {
      throw new Error('Failed to fetch semesters: ' + error);
    }
  }

  async getSemesterById(id: string): Promise<SemesterModel> {
    try {
      const result = await this.getDocument('semesters', id);
      return result as unknown as SemesterModel;
    } catch (error) {
      throw new Error('Failed to fetch semester: ' + error);
    }
  }

  // ==================== SUBJECTS ====================
  async getSubjectsBySemester(semesterId: string): Promise<SubjectsResponse> {
    try {
      console.log(semesterId);
      const result = await this.listDocuments('subjects', [
        Query.equal('semesters', semesterId),
        Query.orderAsc('name') // Order subjects by name
      ]);
      
      const subjects = result.documents as unknown as SubjectModel[];
      
      return {
        data: subjects,
        message: 'Subjects retrieved successfully',
        total: result.total
      };
    } catch (error) {
      throw new Error('Failed to fetch subjects: ' + error);
    }
  }

  async getSubjectById(id: string): Promise<SubjectModel> {
    try {
      const result = await this.getDocument('subjects', id);
      return result as unknown as SubjectModel;
    } catch (error) {
      throw new Error('Failed to fetch subject: ' + error);
    }
  }

  // ==================== RESOURCES ====================
  async getResourcesBySubjectAndType(
    subjectId: string, 
    resourceType: 'question' | 'note' | 'syllabus',
    limit: number = 50
  ): Promise<ResourcesResponse> {
    try {
      const queries = [
        Query.equal('subjects', subjectId),
        Query.equal('resource_type', resourceType),
        Query.limit(limit)
      ];

      // For questions, order by year descending (latest first)
      if (resourceType === 'question') {
        queries.push(Query.orderDesc('year'));
      } else {
        // For notes and syllabus, order by creation date
        queries.push(Query.orderDesc('$createdAt'));
      }

      const result = await this.listDocuments('resources', queries);
      
      const resources = result.documents as unknown as ResourceModel[];
      
      return {
        data: resources,
        message: 'Resources retrieved successfully',
        total: result.total
      };
    } catch (error) {
      throw new Error('Failed to fetch resources: ' + error);
    }
  }

  async getResourceWithFiles(resourceId: string): Promise<ResourceWithFiles> {
    try {
      const resource = await this.getDocument('resources', resourceId) as unknown as ResourceModel;
      
      const filesResult = await this.listDocuments('resource_files', [
        Query.equal('resources', resourceId),
        Query.orderAsc('file_title') 
      ]);
      
      const files = filesResult.documents as unknown as ResourceFileModel[];

      console.log("---------------Start-------------");
      console.log(resource);
      console.log(filesResult);
      console.log("---------------End-------------");
      return {
        ...resource,
        files: files
      };
    } catch (error) {
      throw new Error('Failed to fetch resource with files: ' + error);
    }
  }

  async getSemesterWithSubjects(semesterId: string): Promise<{
    semester: SemesterModel;
    subjects: SubjectModel[];
  }> {
    try {
      const [semester, subjectsResponse] = await Promise.all([
        this.getSemesterById(semesterId),
        this.getSubjectsBySemester(semesterId)
      ]);
      
      return {
        semester,
        subjects: subjectsResponse.data
      };
    } catch (error) {
      throw new Error('Failed to fetch semester with subjects: ' + error);
    }
  }

  async getSubjectWithResources(
    subjectId: string, 
    resourceTypes: ('question' | 'note' | 'syllabus')[] = ['question', 'note', 'syllabus']
  ): Promise<{
    subject: SubjectModel;
    resources: { [key: string]: ResourceModel[] };
  }> {
    try {
      const [subject, ...resourcesPromises] = [
        this.getSubjectById(subjectId),
        ...resourceTypes.map(type => this.getResourcesBySubjectAndType(subjectId, type))
      ];

      const [subjectData, ...resourcesResults] = await Promise.all([
        subject,
        ...resourcesPromises
      ]);

      const resources: { [key: string]: ResourceModel[] } = {};
      resourceTypes.forEach((type, index) => {
        resources[type] = resourcesResults[index].data;
      });

      return {
        subject: subjectData,
        resources
      };
    } catch (error) {
      throw new Error('Failed to fetch subject with resources: ' + error);
    }
  }

  async getRecentQuestions(limit: number = 10): Promise<ResourcesResponse> {
    try {
      const result = await this.listDocuments('resources', [
        Query.equal('resource_type', 'question'),
        Query.orderDesc('year'),
        Query.limit(limit)
      ]);
      
      const resources = result.documents as unknown as ResourceModel[];
      
      return {
        data: resources,
        message: 'Recent questions retrieved successfully',
        total: result.total
      };
    } catch (error) {
      throw new Error('Failed to fetch recent questions: ' + error);
    }
  }

  async getResourcesByType(
    resourceType: 'question' | 'note' | 'syllabus',
    limit: number = 20
  ): Promise<ResourcesResponse> {
    try {
      const result = await this.listDocuments('resources', [
        Query.equal('resource_type', resourceType),
        Query.orderDesc('$createdAt'),
        Query.limit(limit)
      ]);
      
      const resources = result.documents as unknown as ResourceModel[];
      
      return {
        data: resources,
        message: `${resourceType} resources retrieved successfully`,
        total: result.total
      };
    } catch (error) {
      throw new Error(`Failed to fetch ${resourceType} resources: ` + error);
    }
  }
}