
import { Injectable } from '@angular/core';
import { Client, Storage as AppwriteStorage, ID } from 'appwrite';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage: AppwriteStorage;

  constructor() {
    const client = new Client()
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.projectId);

    this.storage = new AppwriteStorage(client);
  }

  uploadFile(bucketId: string, file: File) {
    return this.storage.createFile(bucketId, ID.unique(), file);
  }

  // Delete an object by id
  deleteFile(bucketId: string, fileId: string) {
    return this.storage.deleteFile(bucketId, fileId);
  }

  getFileViewUrl(bucketId: string, fileId: string): string {
    const url = this.storage.getFileView(bucketId, fileId) as unknown as string;
    return typeof url === 'string' ? url : (url as any)?.toString?.() ?? '';
  }

  getFileDownloadUrl(bucketId: string, fileId: string): string {
    const url = this.storage.getFileDownload(bucketId, fileId) as unknown as string;
    return typeof url === 'string' ? url : (url as any)?.toString?.() ?? '';
  }


  extractFileIdFromViewUrl(fileUrl: string): string | null {
    try {
      const m = fileUrl.match(/\/files\/([^/]+)\/view/);
      return m?.[1] ?? null;
    } catch {
      return null;
    }
  }
}
