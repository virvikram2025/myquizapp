import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  signupForm!: FormGroup; // The exclamation mark indicates that this property will be initialized later
  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); //it marks all controls inside a form as touched
      return;
    } else {
      this.auth.signup({
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      });
      this.router.navigate(['/login']);
    }
  }
  gohome() {
    this.router.navigate(['/landing']);
  }
}
