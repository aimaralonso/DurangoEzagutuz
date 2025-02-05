import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class QuizPage {

  // Get the sentences
  sentences = [
    {
      sentence: 'El cielo es azul.',
      img: 'assets/images/paso.png',
      answer: 'egia',
    },
    {
      sentence: 'Los perros pueden volar.',
      img: 'assets/images/paso.png',
      answer: 'gezurra',
    },
    {
      sentence: 'El agua es incolora.',
      img: 'assets/images/paso.png',
      answer: 'egia',
    },
  ];

  userResponse: (string | null)[] = new Array(this.sentences.length).fill(null); // Store the answers
  showingAnswers: boolean = false; // Flag to show answers with tick/cross

  constructor() {}

  // Function to select the answer
  selectAnswer(answer: string, index: number) {
    this.userResponse[index] = answer; // Store the answer in userResponse array
  }

  // Function to check all answers
  checkAllAnswers() {
    this.showingAnswers = true; // Reveal answers when ZUZENDU is clicked
  }

  // Function to check if answer is correct or not
  getAnswerStatus(index: number): 'success' | 'error' | null {
    if (this.userResponse[index] === null) {
      return null; // If no answer selected, no status
    }
    return this.userResponse[index] === this.sentences[index].answer ? 'success' : 'error';
  }

  // Function to check if exercise is completed
  exerciseCompleted(): boolean {
    return this.userResponse.every((response) => response !== null); // Check if all answers are selected
  }
}
