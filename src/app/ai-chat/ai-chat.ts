import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  html?: SafeHtml;   // pre-rendered markdown (assistant only)
  timestamp: Date;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AiChat implements AfterViewChecked {
  @ViewChild('messagesEnd') private messagesEnd!: ElementRef;
  @ViewChild('textarea') private textareaRef!: ElementRef<HTMLTextAreaElement>;

  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;
  error = '';

  private readonly API_URL = 'https://apifreellm.com/api/v1/chat';
  private readonly API_KEY = 'apf_a4cvn8zbb1v7mpbcqbthgq3d';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    // Configure marked: enable GitHub-flavored markdown
    marked.setOptions({ gfm: true, breaks: true } as any);
  }

  private parseMarkdown(text: string): SafeHtml {
    const html = marked.parse(text) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  onTextareaInput(event: Event): void {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  async sendMessage(): Promise<void> {
    const message = this.userInput.trim();
    if (!message || this.isLoading) return;

    this.userInput = '';
    this.error = '';

    // Reset textarea height
    if (this.textareaRef?.nativeElement) {
      this.textareaRef.nativeElement.style.height = 'auto';
    }

    this.messages.push({ role: 'user', text: message, timestamp: new Date() });
    this.isLoading = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.API_KEY}`,
    });

    this.http
      .post<any>(this.API_URL, { message }, { headers })
      .subscribe({
        next: (res) => {
          // API returns { success: true, response: "...", ... }
          const reply: string =
            res?.response ??
            res?.message ??
            res?.reply ??
            res?.text ??
            res?.content ??
            res?.data?.response ??
            res?.data?.message ??
            (typeof res === 'string' ? res : JSON.stringify(res));

          this.messages.push({
            role: 'assistant',
            text: reply,
            html: this.parseMarkdown(reply),
            timestamp: new Date(),
          });
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.error =
            err?.error?.message ??
            err?.message ??
            'Something went wrong. Please try again.';
        },
      });
  }

  clearChat(): void {
    this.messages = [];
    this.error = '';
  }

  quickSend(text: string): void {
    this.userInput = text;
    this.sendMessage();
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
