import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Errorpage } from './components/errorpage/errorpage';
import { Landing } from './components/landing/landing';
import { Quiz } from './components/quiz/quiz';
import { Admin } from './components/admin/admin';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'landing', component: Landing },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'quiz', component: Quiz, canActivate: [authGuard] },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: '**', component: Errorpage },
];
