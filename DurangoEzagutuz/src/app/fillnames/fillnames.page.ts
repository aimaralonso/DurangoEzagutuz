import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fillnames',
  templateUrl: './fillnames.page.html',
  styleUrls: ['./fillnames.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})

export class FillnamesPage {
  words = ['ARMARIARA', 'BEGIRATOKIA', 'ARKUA', 'BUPULAK'];
  assignedWords: { [key: number]: string } = {};
  correctAnswers: { [key: number]: string } = {
    0: 'ARMARIARA',
    1: 'BEGIRATOKIA',
    2: 'BUPULAK',
    3: 'ARKUA'
  };
  message: string = '';
  dropZones = [
    { top: '25%', left: '37%' },
    { top: '45%', left: '20%' },
    { top: '20%', left: '70%' },
    { top: '65%', left: '35%' }
  ];
  
  selectedWord: string | null = null;
  selectedWordIndex: number | null = null;

  constructor() {}

  selectWord(index: number) {
    this.selectedWord = this.words[index];
    this.selectedWordIndex = index;
  }

  assignWordToZone(index: number) {
    if (this.selectedWord && this.selectedWordIndex !== null) {
      this.assignedWords[index] = this.selectedWord;
      this.words[this.selectedWordIndex] = '';
      this.selectedWord = null;
      this.selectedWordIndex = null;
    }
  }

  checkAnswers() {
    let allCorrect = true;
    for (const key in this.correctAnswers) {
      if (this.assignedWords[key] !== this.correctAnswers[key]) {
        allCorrect = false;
        break;
      }
    }
    this.message = allCorrect ? "Ariketa ondo egin duzu!" : "Zerbait gaizki egin duzu...";
  }
}
