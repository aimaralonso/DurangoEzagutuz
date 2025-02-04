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

  userResponse: (string | null)[] = new Array(this.sentences.length).fill(
    null
  );
  showingAnswers: boolean[] = new Array(this.sentences.length).fill(false);

  constructor() {}

  // Function for select answer
  selectAnswer(answer: string, index: number) {
    this.userResponse[index] = answer;
    this.showingAnswers[index] = true;
  }

  // Function for correct exercise
  checkAllAnswers() {
    let corrects = 0;
    this.sentences.forEach((sentence, index) => {
      if (this.userResponse[index] === sentence.answer) {
        corrects++;
      }
    });

    const totalSentences = this.sentences.length;
    alert(`${totalSentences} galderetatik ${corrects} asmatu dituzu.`);
  }

  // Function for checking if exercise is completed
  exerciseCompleted(): boolean {
    return this.userResponse.every((response) => response !== null);
  }
}
