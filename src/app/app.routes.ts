import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './components/login/login';
import { Logout } from './components/logout/logout';
import { Signup } from './components/signup/signup';
import { Errorpage } from './components/errorpage/errorpage';
import { Landing } from './components/landing/landing';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'landing', component: Landing },
  { path: 'components/signup', component: Signup },
  { path: 'components/login', component: Login },
  { path: 'components/logout', component: Logout },
  { path: '**', component: Errorpage },
];
