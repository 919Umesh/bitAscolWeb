/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

(function primeTheme() {
  const LS_KEY = 'theme.mode';
  let saved: 'light' | 'dark' = 'light';
  try {
    const v = localStorage.getItem(LS_KEY);
    if (v === 'dark' || v === 'light') saved = v;
  } catch {}

  document.documentElement.setAttribute('data-theme', saved);
  document.documentElement.style.colorScheme = saved;
})();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
