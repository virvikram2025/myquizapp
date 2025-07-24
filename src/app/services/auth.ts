import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private loggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  constructor(private router: Router) {}

  signup(user: any) {
    const userWithFlag = { ...user, loggedIn: '0' };
    localStorage.setItem('user', JSON.stringify(userWithFlag));
  }

 login(email: string, password: string): boolean {
    if (email == environment.userid && password == environment.password) {
      const adminuser = {
        email: environment.userid,
        password: environment.password,
        IsAdmin: '1',
        loggedIn: '1',
      };
      localStorage.setItem('user', JSON.stringify(adminuser));
      return true;
    } else {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return false;
      const user = JSON.parse(storedUser);
      const isValid = user.email === email && user.password === password;
      if (isValid) {
        user.loggedIn = '1';
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('IsAdmin', '0');
        return isValid;
      } else {
        return false;
      }
    }
  }

  logout() {
    debugger
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.loggedIn = '0';
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.loggedIn$.next(false);
    this.router.navigate(['/landing']);
  }

  isAuthenticated(): boolean {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return false;

    const user = JSON.parse(storedUser);
    return user.loggedIn === '1';
  }
  getLoginStatus() {
    return this.loggedIn$.asObservable();
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
