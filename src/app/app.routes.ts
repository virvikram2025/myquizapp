import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Logout } from './components/logout/logout';
import { Signup } from './components/signup/signup';
import { Errorpage } from './components/errorpage/errorpage';
import { Landing } from './components/landing/landing';
import { Quiz } from './components/quiz/quiz';

export const routes: Routes = [
  // { path: '', component: App },
  { path: '', component: Landing },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'quiz', component: Quiz },
  { path: '**', component: Errorpage },
];
