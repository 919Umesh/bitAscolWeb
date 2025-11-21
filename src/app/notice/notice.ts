import { Component, OnInit } from '@angular/core';
import { NoticeModelPagination, NoticesResponsePagination } from '../models/noticesPagination';
import { NoticesService } from '../services/api/notices';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NoticesPaginationService } from '../services/api/notices-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [], 
  templateUrl: './notice.html',
  styleUrl: './notice.css',
})
export class Notice implements OnInit {
  notices: NoticeModelPagination[] = [];
  selectedNotice: NoticeModelPagination | null = null;
  showNoticeDetails = false;
  error: string | null = null;
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalNotices: number = 0;
  totalPages: number = 0;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  isLoading: boolean = false;
Math: any;

  constructor(
    private noticesService: NoticesPaginationService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadNotices();
  }

  async loadNotices(page: number = 1) {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response: NoticesResponsePagination = await this.noticesService.getNotices({
        page: page,
        limit: this.itemsPerPage
      });
      
      this.notices = response.data;
      this.currentPage = response.currentPage;
      this.totalNotices = response.total;
      this.totalPages = response.totalPages;
      this.hasNextPage = response.hasNextPage;
      this.hasPrevPage = response.hasPrevPage;
      
      console.log('Notices loaded:', this.notices);
      console.log('Pagination info:', {
        currentPage: this.currentPage,
        totalPages: this.totalPages,
        totalNotices: this.totalNotices
      });
    } catch (error) {
      this.error = 'Failed to load notices. Please try again.';
      console.error('Error loading notices:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Pagination methods
  async nextPage() {
    if (this.hasNextPage) {
      await this.loadNotices(this.currentPage + 1);
    }
  }

  async prevPage() {
    if (this.hasPrevPage) {
      await this.loadNotices(this.currentPage - 1);
    }
  }

  async goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      await this.loadNotices(page);
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  openNotice(notice: NoticeModelPagination) {
    this.router.navigate(['/notice', notice.$id]);
  }



  clearError() {
    this.error = null;
  }
}