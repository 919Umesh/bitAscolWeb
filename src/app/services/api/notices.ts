import { Injectable } from '@angular/core';
import { AppwriteBaseService } from '../appwrite';
import { NoticeModel, NoticesResponse } from '../../models/notices';


@Injectable({
  providedIn: 'root',
})
export class NoticesService extends AppwriteBaseService {
  
  async getNotices(limit: number = 10): Promise<NoticesResponse> {
    try {
      const result = await this.listDocuments('notices', [
        AppwriteBaseService.orderDesc('$createdAt'),
        AppwriteBaseService.limit(limit)
      ]);
     
      const notices = result.documents as unknown as NoticeModel[];
      
      return {
        data: notices,
        message: 'Notices retrieved successfully',
        total: result.total
      };
    } catch (error) {
      throw new Error('Failed to fetch notices: ' + error);
    }
  }
  async getNoticeById(id: string): Promise<NoticeModel> {
    try {
     const result = await this.getDocument('notices', id);
     console.log(result);
    return result as unknown as NoticeModel;
    } catch (error) {
      throw new Error('Failed to fetch notices: ' + error);
    }
  }
  
}