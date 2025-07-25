import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private isAdmin$ = new BehaviorSubject<boolean>(false);
  private userName$ = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    const user = this.getStoredUser();
    this.loggedIn$.next(user?.loggedIn === '1');
    this.isAdmin$.next(user?.IsAdmin === '1');
    this.userName$.next(user ? this.extractUserName(user) : '');
  }
  initFromStorage() {
    const user = this.getStoredUser();
    const isLoggedIn = user?.loggedIn === '1';
    const isAdmin = user?.IsAdmin === '1';
    const name = this.extractUserName(user);

    this.loggedIn$.next(isLoggedIn);
    this.isAdmin$.next(isAdmin);
    this.userName$.next(name);
  }
  private getStoredUser() {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  private extractUserName(user: any): string {
    return user?.IsAdmin === '1' ? 'Admin' : user?.email?.split('@')[0] || '';
  }

  signup(user: any) {
    const userWithDefaults = { ...user, loggedIn: '0', IsAdmin: '0' };
    localStorage.setItem('user', JSON.stringify(userWithDefaults));
  }

  login(email: string, password: string): boolean {
    if (email === environment.userid && password === environment.password) {
      // Admin login
      const adminUser = {
        email: environment.userid,
        password: environment.password,
        IsAdmin: '1',
        loggedIn: '1',
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      this.loggedIn$.next(true);
      this.isAdmin$.next(true);
      this.userName$.next('Admin');
      return true;
    }

    const user = this.getStoredUser();
    if (user && user.email === email && user.password === password) {
      user.loggedIn = '1';
      user.IsAdmin = '0';
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn$.next(true);
      this.isAdmin$.next(false);
      this.userName$.next(this.extractUserName(user));
      return true;
    }

    return false;
  }

  logout() {
    const user = this.getStoredUser();
    if (user) {
      user.loggedIn = '0';
      localStorage.setItem('user', JSON.stringify(user));
    }

    this.loggedIn$.next(false);
    this.isAdmin$.next(false);
    this.userName$.next('');
    this.router.navigate(['/landing']);
  }

  isAuthenticated(): boolean {
    return this.loggedIn$.getValue();
  }

  isAdmin(): boolean {
    return this.isAdmin$.getValue();
  }

  getLoginStatus() {
    return this.loggedIn$.asObservable();
  }

  getAdminStatus() {
    return this.isAdmin$.asObservable();
  }

  getUserName() {
    return this.userName$.asObservable();
  }
}
