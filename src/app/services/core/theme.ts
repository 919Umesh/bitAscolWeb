
import { Injectable, effect, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark' | 'system';
const LS_KEY = 'theme.mode';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  mode = signal<ThemeMode>(this.readInitialMode());

  private apply = effect(() => {
    const m = this.mode();
    const root = document.documentElement;

    root.setAttribute('data-theme', m);

    const dark =
      m === 'dark' ||
      (m === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.style.colorScheme = dark ? 'dark' : 'light';

    try { localStorage.setItem(LS_KEY, m); } catch {}
  });

  constructor() {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', () => {
      if (this.mode() === 'system') this.mode.set('system'); // re-trigger effect
    });
  }

  setLight() { this.mode.set('light'); }
  setDark() { this.mode.set('dark'); }
  setSystem() { this.mode.set('system'); }
  toggle() {
    const current = this.resolvedMode();
    this.mode.set(current === 'dark' ? 'light' : 'dark');
  }

  resolvedMode(): 'light' | 'dark' {
    if (this.mode() === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return this.mode() as 'light' | 'dark';
  }

  private readInitialMode(): ThemeMode {
    try {
      const saved = localStorage.getItem(LS_KEY) as ThemeMode | null;
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {}
    return 'system';
  }
}
