import { Injectable } from '@angular/core';
import { AppwriteBaseService } from '../appwrite';
import { NoticeModelPagination, NoticesResponsePagination, PaginationParams } from '../../models/noticesPagination';

@Injectable({
  providedIn: 'root',
})
export class NoticesPaginationService extends AppwriteBaseService {
  
  // Get notices with pagination
  async getNotices(params: PaginationParams = {}): Promise<NoticesResponsePagination> {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (page - 1) * limit;

      const queries = [
        AppwriteBaseService.orderDesc('$createdAt'),
        AppwriteBaseService.limit(limit),
        AppwriteBaseService.offset(offset)
      ];

      const result = await this.listDocuments('notices', queries);
      const notices = result.documents as unknown as NoticeModelPagination[];
      
      const totalPages = Math.ceil(result.total / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        data: notices,
        message: 'Notices retrieved successfully',
        total: result.total,
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage
      };
    } catch (error) {
      throw new Error('Failed to fetch notices: ' + error);
    }
  }

  
}