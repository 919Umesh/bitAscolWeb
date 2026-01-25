
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Resources } from './resources/resources';
import { Details } from './details/details';
import { Gallery } from './gallery/gallery';
import { Notice } from './notice/notice';
import { authGuard } from './guards/auth-guard';
import { Upload } from './upload/upload'; // your standalone Upload component
import { Login } from './login/login';
import { ResourcesManageComponent } from './resources-manage/resources-manage'; // <-- IMPORTANT

export const routes: Routes = [
  { path: '', component: Home },

  // public pages
  { path: 'resources', component: Resources },
  { path: 'notice', component: Notice },
  { path: 'gallery', component: Gallery },
  { path: 'details', component: Details },
  { path: 'login', component: Login },

  // admin pages (protected)
  { path: 'resources/new', component: Upload, canActivate: [authGuard] },
  { path: 'resources/:id/edit', component: Upload, canActivate: [authGuard] },
  { path: 'resources/manage', component: ResourcesManageComponent, canActivate: [authGuard] },

  // legacy redirect
  { path: 'upload', redirectTo: 'resources/new' },

  // fallback
  { path: '**', redirectTo: '' },
];
