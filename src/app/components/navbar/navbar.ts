import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isLoggedIn = false;
  userName = '';
  isAdmin = false;

  constructor(private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.getLoginStatus().subscribe((status) => {
      console.log('Login Status:', status);
      this.isLoggedIn = status;
    });

    this.auth.getAdminStatus().subscribe((status) => {
      console.log('Admin Status:', status);
      this.isAdmin = status;
    });

    this.auth.getUserName().subscribe((name) => {
      console.log('Username:', name);
      this.userName = name;
    });
  }
  logout(): void {
    this.auth.logout();
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent) {
    $event.returnValue = 'Are you sure you want to leave this site?';
  }
}
