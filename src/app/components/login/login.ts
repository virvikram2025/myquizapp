import { Component, ViewChild } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @ViewChild('passwordRef') passwordField!: NgModel; // ViewChild to access the password field

  constructor(private auth: Auth, private router: Router) {}
  login(form: any) {
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    } else {
      const email = form.value.email; //accessing the email value from the form
      const password = this.passwordField;
      const success = this.auth.login(email, password.value);
      if (success) {
        this.router.navigate(['/landing']);
      } else {
        alert('Invalid credentials');
      }
    }
  }
  gohome() {
    this.router.navigate(['/landing']);
  }
}
