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

  constructor(private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.name || 'User';
    });

    // const user = localStorage.getItem('user');
    // if (user) {
    //   const userData = JSON.parse(user);
    //   this.isLoggedIn = userData.loggedIn === '1';
    //   this.userName = userData.name || 'User';
    // }
  }
  logout(): void {
    this.auth.logout();
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent) {
    $event.returnValue = 'Are you sure you want to leave this site?';
  }
  // logout(): void {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   user.loggedIn = '0';
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.isLoggedIn = false;
  //   this.router.navigate(['/landing']);
  // }

  // ngOnInit(): void {
  //   this.updateLoginState();
  // }

  // ngDoCheck(): void {
  //   this.updateLoginState(); // checks on every change detection
  // }

  // updateLoginState() {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     const userData = JSON.parse(user);
  //     this.isLoggedIn = userData.loggedIn === '1';
  //     this.userName = userData.name || 'User';
  //   } else {
  //     this.isLoggedIn = false;
  //     this.userName = '';
  //   }
  // }

  // logout(): void {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   user.loggedIn = '0';
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.isLoggedIn = false;
  //   this.router.navigate(['/landing']);
  // }
}
