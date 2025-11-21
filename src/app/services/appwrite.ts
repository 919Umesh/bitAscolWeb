import { Injectable } from '@angular/core';
import { Client, Account, Databases, Query } from 'appwrite';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppwriteBaseService {
  protected client: Client;
  public account: Account;
  public databases: Databases;
  
  protected databaseId = environment.appwrite.databaseId;
  protected collections = {
     bitNotes: 'bitNotes',
     notices: 'notices',
     semesters: 'semesters',
     subjects: 'subjects',
     resources: 'resources',
     resource_files: 'resource_files',
     gallery : 'gallery'
  };

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.projectId);
    
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async createDocument(collection: string, data: any, documentId: string = 'unique()') {
    return await this.databases.createDocument(
      this.databaseId,
      this.collections[collection as keyof typeof this.collections],
      documentId,
      data
    );
  }

  async getDocument(collection: string, documentId: string) {
    return await this.databases.getDocument(
      this.databaseId,
      this.collections[collection as keyof typeof this.collections],
      documentId
    );
  }

  async listDocuments(collection: string, queries: string[] = []) {
    return await this.databases.listDocuments(
      this.databaseId,
      this.collections[collection as keyof typeof this.collections],
      queries
    );
  }

  async updateDocument(collection: string, documentId: string, data: any) {
    return await this.databases.updateDocument(
      this.databaseId,
      this.collections[collection as keyof typeof this.collections],
      documentId,
      data
    );
  }

  async deleteDocument(collection: string, documentId: string) {
    return await this.databases.deleteDocument(
      this.databaseId,
      this.collections[collection as keyof typeof this.collections],
      documentId
    );
  }

  static equal(attribute: string, value: any): string {
    return Query.equal(attribute, value);
  }

  static offset(offset: number): string {
    return Query.offset(offset);
  }

  static limit(limit: number): string {
    return Query.limit(limit);
  }

  static orderDesc(attribute: string): string {
    return Query.orderDesc(attribute);
  }
  
  static orderAsc(attribute: string): string {
    return Query.orderAsc(attribute);
  }


  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): Promise<boolean> {
    return this.getCurrentUser().then(user => !!user);
  }

  async logout() {
    try {
      await this.account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}