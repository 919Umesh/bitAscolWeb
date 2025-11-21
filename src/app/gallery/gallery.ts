import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModel } from '../models/gallery';
import { GalleryService } from '../services/api/gallery';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements OnInit {
  photos: GalleryModel[] = [];
  loading = false;
  error = '';

  constructor(private galleryService: GalleryService) {}

  async ngOnInit() {
    await this.loadPhotos();
  }

  async loadPhotos() {
    try {
      this.loading = true;
      this.error = '';
      const response = await this.galleryService.getPhotos();
      this.photos = response.data;
      console.log('Photos loaded:', this.photos);
    } catch (error: any) {
      this.error = error.message;
      console.error('Error loading photos:', error);
    } finally {
      this.loading = false;
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  downloadPhoto(photo: GalleryModel) {
    if (photo.file_url) {
      window.open(photo.file_url, '_blank');
    }
  }
}