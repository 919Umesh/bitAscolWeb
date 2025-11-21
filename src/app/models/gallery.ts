export interface GalleryModel {
  $id: string;
  file_url: string;
  title:string,
  $sequence: number;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $tableId: string;
}

export interface GalleryResponse {
  data: GalleryModel[];
  message: string;
  total: number;
}

export interface CreateGalleryRequest {
  file_url: string;
  $sequence?: number;
}