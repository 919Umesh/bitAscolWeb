
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
  {
    path: '',
    component: Home,
    title: 'BIT ASCOL – Home | Nepal BIT Student Portal'
  },

  // public pages
  {
    path: 'resources',
    component: Resources,
    title: 'Resources – BIT ASCOL | Notes, Syllabus & Question Papers'
  },
  {
    path: 'notice',
    component: Notice,
    title: 'Notices – BIT ASCOL | Latest Campus Announcements'
  },
  {
    path: 'gallery',
    component: Gallery,
    title: 'Gallery – BIT ASCOL | Campus Photos'
  },
  {
    path: 'details',
    component: Details,
    title: 'Course Details – BIT ASCOL | BIT Nepal Eligibility & Structure'
  },
  {
    path: 'login',
    component: Login,
    title: 'Login – BIT ASCOL Admin'
  },

  // admin pages (protected)
  {
    path: 'resources/new',
    component: Upload,
    canActivate: [authGuard],
    title: 'Upload Resource – BIT ASCOL Admin'
  },
  {
    path: 'resources/:id/edit',
    component: Upload,
    canActivate: [authGuard],
    title: 'Edit Resource – BIT ASCOL Admin'
  },
  {
    path: 'resources/manage',
    component: ResourcesManageComponent,
    canActivate: [authGuard],
    title: 'Manage Resources – BIT ASCOL Admin'
  },

  // legacy redirect
  { path: 'upload', redirectTo: 'resources/new' },

  // fallback
  { path: '**', redirectTo: '' },
];
