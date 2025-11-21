import { Injectable } from '@angular/core';
import { AppwriteBaseService } from '../appwrite';
import { NoteModel, NotesResponse } from '../../models/notes';

@Injectable({
  providedIn: 'root',
})
export class NotesService extends AppwriteBaseService {
  async getNotes(): Promise<NotesResponse> {
    try {
      const result = await this.listDocuments('bitNotes', [
        AppwriteBaseService.orderDesc('$createdAt')
      ]);
     
      const notes = result.documents as unknown as NoteModel[];
      
      return {
        data: notes,
        message: 'Notes retrieved successfully',
        total: result.total
      };
    } catch (error) {
      throw new Error('Failed to fetch notes: ' + error);
    }
  }
}