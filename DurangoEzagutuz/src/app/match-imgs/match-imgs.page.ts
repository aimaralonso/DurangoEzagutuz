import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-imgs',
  templateUrl: './match-imgs.page.html',
  styleUrls: ['./match-imgs.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})
export class MatchImgsPage {
  // Define images of each column
  beforeImages = [
    { src: 'assets/images/paso.png', matched: false },
    { src: 'assets/images/paso.png', matched: false },
    { src: 'assets/images/paso.png', matched: false },
  ];

  afterImages = [
    { src: 'assets/images/paso.png', matched: false },
    { src: 'assets/images/paso.png', matched: false },
    { src: 'assets/images/paso.png', matched: false },
  ];

  // (left -> right)
  correctPairs: { [key: number]: number } = {
    0: 1,
    1: 0,
    2: 2,
  };

  userPairs: { [key: number]: number } = {};
  lines: any[] = [];
  selectedLeftIndex: number | null = null;
  selectedRightIndex: number | null = null;
  matchedPairs = 0;

  allCorrect: boolean = false;

  constructor(private router: Router) {} 

  selectLeftImage(index: number) {
    if (this.beforeImages[index].matched) return;
    this.selectedLeftIndex = index;
    this.checkMatch();
  }

  selectRightImage(index: number) {
    if (this.afterImages[index].matched) return;
    this.selectedRightIndex = index;
    this.checkMatch();
  }

  checkMatch() {
    if (this.selectedLeftIndex !== null && this.selectedRightIndex !== null) {
      this.userPairs[this.selectedLeftIndex] = this.selectedRightIndex;
  
      const leftDot = document.querySelectorAll('.left-dot')[
        this.selectedLeftIndex
      ] as HTMLElement;
      const rightDot = document.querySelectorAll('.right-dot')[
        this.selectedRightIndex
      ] as HTMLElement;
      const contentRect = document
        .querySelector('ion-content')!
        .getBoundingClientRect();
  
      if (leftDot && rightDot) {
        const leftRect = leftDot.getBoundingClientRect();
        const rightRect = rightDot.getBoundingClientRect();
  
        const line = {
          x1: leftRect.left + leftRect.width / 2 - contentRect.left,
          y1: leftRect.top + leftRect.height / 2 - contentRect.top,
          x2: rightRect.left + rightRect.width / 2 - contentRect.left,
          y2: rightRect.top + rightRect.height / 2 - contentRect.top,
          color: this.getRandomColor(),
        };
  
        this.lines.push(line);
      }
  
      this.beforeImages[this.selectedLeftIndex].matched = true;
      this.afterImages[this.selectedRightIndex].matched = true;
      this.matchedPairs++;
  
      this.selectedLeftIndex = null;
      this.selectedRightIndex = null;
  
    }
  }
  
  checkResults() {
    this.allCorrect = true;
  
    for (const leftIndex in this.correctPairs) {
      if (this.userPairs[leftIndex] !== this.correctPairs[leftIndex]) {
        this.allCorrect = false;
        break;
      }
    }
  
    if (!this.allCorrect) {
      // Si hay uniones incorrectas, reinicia las incorrectas
      this.resetIncorrectPairs();
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  exerciseCompleted(): boolean {
    return this.matchedPairs === Object.keys(this.correctPairs).length;
  }

  resetIncorrectPairs() {
    // Reiniciar las imágenes y las líneas incorrectas
    for (const leftIndex in this.userPairs) {
      if (this.userPairs[leftIndex] !== this.correctPairs[leftIndex]) {
        this.beforeImages[leftIndex].matched = false;
        this.afterImages[this.userPairs[leftIndex]].matched = false;
        this.matchedPairs--;
      }
    }
  
    // Limpiar las líneas incorrectas
    this.lines = this.lines.filter((line, index) => {
      const leftIndex = Object.keys(this.userPairs)[index];
      return this.userPairs[Number(leftIndex)] === this.correctPairs[Number(leftIndex)];
    });
  
    // Reiniciar el estado de las selecciones
    this.userPairs = {};
    this.selectedLeftIndex = null;
    this.selectedRightIndex = null;
  }

  navigateToCongrats() {
    this.router.navigate(['/congrats']);
  }

  handleButtonClick() {
    if (this.exerciseCompleted()) {
      if (!this.allCorrect) {
        this.checkResults();
      } else {
        this.navigateToCongrats();
      }
    }
  }
}

