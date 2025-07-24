import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-landing',
  imports: [RouterModule, CommonModule, Navbar],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  constructor(private router: Router) {}

  startQuiz() {
    this.router.navigate(['/quiz']);
  }
}
