import { Injectable, signal } from '@angular/core';
import { Client, Account, Models } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private client = new Client();
  private account: Account;

  user = signal<Models.User<Models.Preferences> | null>(null);
  loading = signal(true);

  constructor() {
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('691d8e970006515cb4c6');

    this.account = new Account(this.client);
    this.loadUser();
  }

  async loadUser() {
    try {
      const user = await this.account.get();
      this.user.set(user);
    } catch {
      this.user.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  async login(email: string, password: string) {
    await this.account.createEmailPasswordSession(email, password);
    await this.loadUser();
  }

  async logout() {
    await this.account.deleteSession('current');
    this.user.set(null);
  }

  isLoggedIn() {
    return this.user() !== null;
  }
}
