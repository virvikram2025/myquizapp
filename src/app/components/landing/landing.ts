import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Quiz } from '../../services/quiz';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-landing',
  imports: [RouterModule, CommonModule, Navbar],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  quizzes: any[] = [];
  constructor(private auth:Auth, private router: Router, private quizService: Quiz) {}

  ngOnInit(): void {
    debugger;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/landing']);
    }
  
    // this.quizService.getQuizzes().subscribe((data) => {
    //   this.quizzes = data;
    //   console.log(this.quizzes);
    // });
  }

  startQuiz(): void {
    this.router.navigate(['/quiz']);
  }
  // startQuiz(quiz: number): void {
  //   // console.log('Quiz started with ID:', quiz);
  //   this.router.navigate(['/quiz', quiz]);
  // }
}
