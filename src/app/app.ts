import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {  
  currentQuestionIndex = 0;
  questions: any[] = [];
  selectedOption: string = '';
  isAnswered = false;
  isCorrect = false;
  score = 0;
  timer: any;
  timeLeft = 320;
  showResult = false;
  tickSound = new Audio('ticksound.mp3');
  correctAudio = new Audio('correct.mp3');
  wrongAudio = new Audio('wrong.mp3');
  finishAudio = new Audio('finish.mp3');
  isTimerActive = true;
  randomQuestionCount = 40;
  IsPassed = false;

  constructor(private cdr: ChangeDetectorRef,private http: HttpClient) {}

    ngOnInit() {
    this.http.get<any[]>('questions.json').subscribe(data => {
    this.questions = this.getRandomQuestions(data, this.randomQuestionCount);
      this.startTimer();
    });
  }

  
  getRandomQuestions(allQuestions: any[], count: number): any[] {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  restartQuiz(){
    this.currentQuestionIndex = 0;
    this.selectedOption = '';
    this.isAnswered = false;
    this.isCorrect = false;
    this.score = 0;
    this.timeLeft = 320; // reset timer
    this.showResult = false;
    this.isTimerActive = true;
    this.startTimer();
    this.stopTick();
    this.cdr.detectChanges();
    this.IsPassed = false;
  }

startTimer() {
  this.isTimerActive = true;
  this.timer = setInterval(() => {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      if (this.isTimerActive) {
        this.playTick();
      }
      this.cdr.detectChanges();
    } else {
      this.finishQuiz();
      clearInterval(this.timer);
    }
  }, 1000);
}

  playTick() {
    if (this.showResult) return; // don't play tick if quiz ended
    this.tickSound.currentTime = 0;
    this.tickSound.play().catch(() => {});
  }

  
  get percentageScore(): number {
    return (this.score / this.questions.length) * 100;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  checkAnswer(option: string) {
    this.selectedOption = option;
    this.isCorrect = this.questions[this.currentQuestionIndex].answer === option;
    this.isAnswered = true;
    if (this.isCorrect) {
      this.score++;
      this.playCorrect();
    } else {
      this.playWrong();
    }
  }

  playCorrect() {
    this.correctAudio.currentTime = 0;
    this.correctAudio.play();
  }

  playWrong() {
    this.wrongAudio.currentTime = 0;
    this.wrongAudio.play();
  }

  playFinish() {
    this.finishAudio.currentTime = 0;
    this.finishAudio.play();
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedOption = '';
    this.isAnswered = false;
    this.isCorrect = false;
    if (this.currentQuestionIndex === this.questions.length) {
      this.finishQuiz();
    }
  }

finishQuiz() {
  this.isTimerActive = false;
  clearInterval(this.timer);
  this.showResult = true;
  this.stopTick();
  this.playFinish();
  if ((this.score / this.questions.length) * 100 > 50) {
    this.IsPassed = true;
  }
}

stopTick() {
  this.tickSound.pause();
  this.tickSound.currentTime = 0;
}
}
