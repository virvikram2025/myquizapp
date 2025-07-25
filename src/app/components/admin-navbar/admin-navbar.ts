import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  userName$!: Observable<string>;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.getLoginStatus();
    this.userName$ = this.auth.getUserName();

    // Optional: Debug logs
    this.isLoggedIn$.subscribe((status) =>
      console.log('Navbar sees login status:', status)
    );
    this.userName$.subscribe((name) =>
      console.log('Navbar sees username:', name)
    );
  }

  logout(): void {
    this.auth.logout(); // This also navigates to /landing
  }
}
