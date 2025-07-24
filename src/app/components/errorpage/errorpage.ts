import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  imports: [],
  templateUrl: './errorpage.html',
  styleUrl: './errorpage.css'
})
export class Errorpage {
  constructor(private router:Router) {}
  gohome(){
    this.router.navigate(['/landing']);
  }
}
