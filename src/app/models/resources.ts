// models/resources.model.ts
export interface SemesterModel {
  $id: string;
  name: string;
  code: number;
  description:string;
  $createdAt: string;
  $updatedAt: string;
}

export interface SubjectModel {
  $id: string;
  semester_id: string;
  name: string;
  description :string;
  code?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface ResourceModel {
  $id: string;
  subject_id: string;
  resource_type: 'question' | 'note' | 'syllabus';
  title: string;
  year?: number;
  description?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface ResourceFileModel {
  $id: string;
  resource_id: string;
  file_url: string;
  file_title: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface SemestersResponse {
  data: SemesterModel[];
  message: string;
  total: number;
}

export interface SubjectsResponse {
  data: SubjectModel[];
  message: string;
  total: number;
}

export interface ResourcesResponse {
  data: ResourceModel[];
  message: string;
  total: number;
}

export interface ResourceWithFiles extends ResourceModel {
  files: ResourceFileModel[];
}