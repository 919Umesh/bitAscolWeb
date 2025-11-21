import { Injectable } from '@angular/core';
import { AppwriteBaseService } from '../appwrite';
import { GalleryModel, GalleryResponse } from '../../models/gallery';

@Injectable({
  providedIn: 'root',
})
export class GalleryService extends AppwriteBaseService {
  
  async getPhotos(): Promise<GalleryResponse> {
    try {
      const result = await this.listDocuments('gallery', [
        AppwriteBaseService.orderDesc('$createdAt'),
      ]);
      const photos = result.documents as unknown as GalleryModel[];
      return {
        data: photos,
        message: 'Photos retrieved successfully',
        total: result.total
      };
    } catch (error) {
      throw new Error('Failed to fetch gallery photos: ' + error);
    }
  }

  async getPhotoById(id: string): Promise<GalleryModel> {
    try {
      const result = await this.getDocument('gallery', id); 
      return result as unknown as GalleryModel;
    } catch (error) {
      throw new Error('Failed to fetch photo: ' + error);
    }
  }
}