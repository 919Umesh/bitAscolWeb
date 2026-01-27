import { Injectable, effect, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';
const LS_KEY = 'theme.mode';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  mode = signal<ThemeMode>(this.readInitialMode());

  private apply = effect(() => {
    const m = this.mode();
    const root = document.documentElement;
    root.setAttribute('data-theme', m);
    root.style.colorScheme = m;

    try {
      localStorage.setItem(LS_KEY, m);
    } catch {

    }
  });

  constructor() { }
  setLight() {
    this.mode.set('light');
  }
  setDark() {
    this.mode.set('dark');
  }
  toggle() {
    this.mode.set(this.mode() === 'dark' ? 'light' : 'dark');
  }
  resolvedMode(): ThemeMode {
    return this.mode();
  }

  private readInitialMode(): ThemeMode {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === 'dark') return 'dark';
      if (saved === 'light') return 'light';
    } catch {
    }
    return 'light';
  }
}
