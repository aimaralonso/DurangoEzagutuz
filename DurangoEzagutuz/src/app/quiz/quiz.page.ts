import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class QuizPage implements OnInit {
  sentences: any[] = [];
  userResponse: (number | null)[] = [];
  showingAnswers: boolean = false;

  constructor(private router: Router, private databaseService: DatabaseService) {}

  ngOnInit() {
    this.databaseService.dbState().subscribe((res) => {
      if (res) {
        this.databaseService.fetchQuiz().subscribe((data) => {
          this.sentences = data;
          this.userResponse = new Array(this.sentences.length).fill(null);
        });
      }
    });
  }

  selectAnswer(answer: number, index: number) {
    this.userResponse[index] = answer;
  }

  checkAllAnswers() {
    if (!this.showingAnswers) {
      this.showingAnswers = true;
    } else {
      if (this.allAnswersCorrect()) {
        this.router.navigate(['/congrats']);
      } else {
        window.location.reload();
      }
    }
  }

  getAnswerStatus(index: number): 'success' | 'error' | null {
    if (this.userResponse[index] === null) {
      return null;
    }
    return this.userResponse[index] === this.sentences[index].answer ? 'success' : 'error';
  }

  exerciseCompleted(): boolean {
    return this.userResponse.every((response) => response !== null);
  }

  allAnswersCorrect(): boolean {
    return this.userResponse.every((response, index) => 
      response === this.sentences[index].answer
    );
  }
}
