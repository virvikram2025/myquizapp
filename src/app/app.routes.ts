import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Errorpage } from './components/errorpage/errorpage';
import { Landing } from './components/landing/landing';
import { Quiz } from './components/quiz/quiz';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'landing', component: Landing },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'quiz', component: Quiz },
  { path: 'admin', component: Admin },
  { path: '**', component: Errorpage },
];
