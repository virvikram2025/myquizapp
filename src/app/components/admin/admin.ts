import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
  username: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AdminNavbar, RouterModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  users: User[] = [];

  userForm: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    isAdmin: true, // assuming all are admin if created here
  };

  isEditMode = false;

  ngOnInit() {
    const data = localStorage.getItem('adminUsers');
    this.users = data ? JSON.parse(data) : [];
  }

  saveUser() {
    if (this.isEditMode) {
      const index = this.users.findIndex((u) => u.id === this.userForm.id);
      if (index !== -1) {
        this.users[index] = { ...this.userForm };
      }
    } else {
      this.userForm.id = Date.now();
      this.users.push({ ...this.userForm });
    }

    localStorage.setItem('adminUsers', JSON.stringify(this.users));
    this.resetForm();
  }

  editUser(user: User) {
    this.userForm = { ...user };
    this.isEditMode = true;
  }

  deleteUser(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
    localStorage.setItem('adminUsers', JSON.stringify(this.users));
  }

  resetForm() {
    this.userForm = {
      id: 0,
      username: '',
      email: '',
      password: '',
      isAdmin: true,
    };
    this.isEditMode = false;
  }
}
