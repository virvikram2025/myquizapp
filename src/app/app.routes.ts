import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Errorpage } from './components/errorpage/errorpage';
import { Landing } from './components/landing/landing';
import { Quiz } from './components/quiz/quiz';
import { Navbar } from './components/navbar/navbar';

export const routes: Routes = [
  // { path: '', component: App },
  { path: '', component: Landing },
  { path: 'landing', component: Landing },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'quiz', component: Quiz },
  { path: 'navbar', component: Navbar },
  { path: '**', component: Errorpage },
];
