import { Component, OnInit ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { NoticeModel } from '../models/notices';
import { NoticesService } from '../services/api/notices';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [], 
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Home implements OnInit {
  notices: NoticeModel[] = [];
  selectedNotice: NoticeModel | null = null;
  showNoticeDetails = false;
  error: string | null = null;

 constructor(private noticesService: NoticesService,private sanitizer: DomSanitizer,private router: Router) {}

 async ngOnInit() {
    try {
      const response = await this.noticesService.getNotices();
      this.notices = response.data;
      console.log('Notices loaded:', this.notices.length);
    } catch (error) {
      console.error('Error loading notices:', error);
    }
  }

   formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  
openMore() {
  this.router.navigate(['/notice']);
}
openMoreResource() {
  this.router.navigate(['/resources']);
}

openGallery() {
  this.router.navigate(['/gallery']);
}
  async downloadNoticeDirect(noticeId: string) {
    try {
      const notice = await this.noticesService.getNoticeById(noticeId);
      
      if (notice.file && notice.file) {
        const link = document.createElement('a');
        link.href = notice.file;
        link.download = notice.file || `notice-${noticeId}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.error = null;
        console.log('Notice downloaded successfully:', notice.topic);
      } else {
        this.error = 'No file attached to this notice';
        console.warn('No file available for notice ID:', noticeId);
      }
    } catch (error: any) {
      this.error = 'Failed to download notice: ' + error.message;
      console.error('Error downloading notice:', error);
    }
  }

  
}