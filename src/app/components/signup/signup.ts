import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  name = '';
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  signup() {
    if (!this.name || !this.email || !this.password) {
      alert('All fields are required.');
      return;
    }
    this.auth.signup({
      name: this.name,
      email: this.email,
      password: this.password,
    });
    alert('Signup successful! Please login.');
    this.router.navigate(['/login']);
  }
}
