import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { environment } from '../../../environments/environment.development';
interface AdminUser {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @ViewChild('passwordRef') passwordField!: NgModel; // ViewChild to access the password field

  constructor(private auth: Auth, private router: Router) {}
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/landing']);
    }
  }
  login(form: any) {
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const email = form.value.email;
    const password = this.passwordField.value;

    const storedAdmins = localStorage.getItem('adminUsers');
    const adminUsers: AdminUser[] = storedAdmins
      ? JSON.parse(storedAdmins)
      : [];

    const isAdmin = adminUsers.some(
      (user) => user.email === email && user.password === password
    );
    if (isAdmin) {
      console.log('Admin login success');
      this.router.navigate(['/admin']);
      return;
    }
    // Check if it's admin login
    // if (email === environment.userid && password === environment.password) {
    //   console.log('Admin login success');
    //   this.router.navigate(['/admin']);
    //   return;
    // }

    // Otherwise, check user login (from your Auth service)
    const success = this.auth.login(email, password); // Adjust if async

    if (success) {
      console.log('User login success');
      this.router.navigate(['/landing']);
    } else {
      alert('Invalid credentials');
    }
  }

  gohome() {
    this.router.navigate(['/landing']);
  }
}
