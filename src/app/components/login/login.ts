import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('All fields are required.');
      return;
    } else if (!this.email) {
      alert('Email is required.');
      return;
    } else if (!this.password) {
      alert('Password is required.');
      return;
    }
    const success = this.auth.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/quiz']);
    } else {
      alert('Invalid credentials');
    }
  }
}
