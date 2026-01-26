
/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

(function primeTheme() {
  const LS_KEY = 'theme.mode';
  let saved: 'light' | 'dark' | 'system' = 'light';
  try {
    const v = localStorage.getItem(LS_KEY) as any;
    if (v === 'light' || v === 'dark' || v === 'system') saved = v;
  } catch {}

  document.documentElement.setAttribute('data-theme', saved);
  const isDark =
    saved === 'dark' ||
    (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
})();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
