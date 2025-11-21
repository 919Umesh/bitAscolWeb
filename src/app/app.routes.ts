import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Resources } from './resources/resources';
import { Details } from './details/details';
import { Gallery } from './gallery/gallery';
import { Notice } from './notice/notice';

export const routes: Routes = [
    {path:'',component:Home},
    { path: 'resources', component: Resources } ,
    { path: 'notice', component: Notice } ,
    { path: 'gallery', component: Gallery } ,
    { path: 'details', component: Details } ,
    { path: '**', redirectTo: '' } 
];
