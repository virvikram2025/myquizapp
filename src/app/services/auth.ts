import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private router: Router) {}

  signup(user: any) {
    const userWithFlag = { ...user, loggedIn: '0' };
    localStorage.setItem('user', JSON.stringify(userWithFlag));
  }

  login(email: string, password: string): boolean {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return false;

    const user = JSON.parse(storedUser);
    const isValid = user.email === email && user.password === password;

    if (isValid) {
      user.loggedIn = '1';
      localStorage.setItem('user', JSON.stringify(user));
    }

    return isValid;
  }

  logout() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.loggedIn = '0';
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return false;

    const user = JSON.parse(storedUser);
    return user.loggedIn === '1';
  }
}

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class Auth {
//   constructor(private router: Router) {}

//   signup(user: any) {
//     localStorage.setItem('user', JSON.stringify(user));
//   }

//   login(email: string, password: string): boolean {
//     const storedUser = localStorage.getItem('user');
//     if (!storedUser) return false;

//     const user = JSON.parse(storedUser);
//     const isValid = user.email === email && user.password === password;

//     if (isValid) {
//       localStorage.setItem('loggedIn', 'true');
//     }

//     return isValid;
//   }

//   logout() {
//     localStorage.removeItem('loggedIn');
//     this.router.navigate(['/auth/login']);
//   }

//   isAuthenticated(): boolean {
//     return localStorage.getItem('loggedIn') === 'true';
//   }
// }
