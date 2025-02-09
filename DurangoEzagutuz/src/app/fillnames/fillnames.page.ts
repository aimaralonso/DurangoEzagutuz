import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fillnames',
  templateUrl: './fillnames.page.html',
  styleUrls: ['./fillnames.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})
export class FillnamesPage implements OnInit {
  words: (string | null)[] = ['ARMARIARA', 'BEGIRATOKIA', 'ARKUA', 'BUPULAK'];
  assignedWords: { [key: number]: string } = {};
  correctAnswers: { [key: number]: string } = {
    0: 'ARMARIARA',
    1: 'BEGIRATOKIA',
    2: 'BUPULAK',
    3: 'ARKUA',
  };
  message: string = '';
  dropZones = [
    { top: '17%', left: '35%' }, // Armariara
    { top: '45%', left: '20%' }, // Begiratokia
    { top: '30%', left: '70%' }, // Bupulak
    { top: '65%', left: '35%' }, // Arkua
  ];
  locationId: number | null = null;
  selectedWord: string | null = null;
  selectedWordIndex: number | null = null;
  full: boolean = false;
  buttonLabel: string = 'ZUZENDU';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}


  ngOnInit() {

    this.locationId = history.state.location;
  }

  selectWord(index: number) {
    const currentElement = document.getElementById(`word-${index}`);

    if (this.selectedWordIndex === index) {
      if (currentElement) {
        currentElement.classList.remove('active');
      }
      this.selectedWord = null;
      this.selectedWordIndex = null;
    } else {
      if (this.selectedWordIndex !== null) {
        const prevElement = document.getElementById(
          `word-${this.selectedWordIndex}`
        );
        if (prevElement) {
          prevElement.classList.remove('active');
        }
      }
      this.selectedWord = this.words[index];
      this.selectedWordIndex = index;
      if (currentElement) {
        currentElement.classList.add('active');
      }
    }
  }

  assignWordToZone(index: number) {
    if (this.assignedWords[index]) {
      const wordToReturn = this.assignedWords[index];
      const emptyIndex = this.words.findIndex((word) => word === null);
      if (emptyIndex !== -1) {
        this.words[emptyIndex] = wordToReturn;
      } else {
        this.words.push(wordToReturn);
      }
      delete this.assignedWords[index];
    } else if (this.selectedWord && this.selectedWordIndex !== null) {
      this.assignedWords[index] = this.selectedWord;
      this.words[this.selectedWordIndex] = null;
      this.selectedWord = null;
      this.selectedWordIndex = null;
    }
    this.full = this.areAllZonesFilled();
  }

  areAllZonesFilled(): boolean {
    return Object.keys(this.assignedWords).length === this.dropZones.length;
  }

  checkAnswers() {
    if (this.buttonLabel === 'ZUZENDU') {
      let allCorrect = true;
      for (const key in this.correctAnswers) {
        if (this.assignedWords[key] !== this.correctAnswers[key]) {
          allCorrect = false;
          break;
        }
      }
      this.buttonLabel = allCorrect ? 'AMAITU' : 'ERREPIKATU';
    }else{
      this.handleButtonClick();
    }
  }

  handleButtonClick() {
    if (this.buttonLabel === 'ERREPIKATU') {
      this.removeIncorrectWords();
    } else if (this.buttonLabel === 'AMAITU') {
      this.router.navigate(['/congrats'],{state: { location: this.locationId },});
    }
  }

  removeIncorrectWords() {
    for (const key in this.assignedWords) {
      if (this.assignedWords[key] !== this.correctAnswers[key]) {
        const incorrectWord = this.assignedWords[key];
        delete this.assignedWords[key];
        const emptyIndex = this.words.findIndex((word) => word === null);
        if (emptyIndex !== -1) {
          this.words[emptyIndex] = incorrectWord;
        } else {
          this.words.push(incorrectWord);
        }
      }
    }
    this.buttonLabel = 'ZUZENDU';
  }
}
