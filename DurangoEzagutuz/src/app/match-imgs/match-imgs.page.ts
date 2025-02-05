import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

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
  ];

  afterImages = [
    { src: 'assets/images/paso.png', matched: false },
    { src: 'assets/images/paso.png', matched: false },
  ];

  // (left -> right)
  correctPairs: { [key: number]: number } = {
    0: 1,
    1: 0,
  };

  userPairs: { [key: number]: number } = {};
  lines: any[] = [];
  selectedLeftIndex: number | null = null;
  selectedRightIndex: number | null = null;
  matchedPairs = 0;

  constructor() {}

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
      // Save user pair
      this.userPairs[this.selectedLeftIndex] = this.selectedRightIndex;

      // Draw the line
      const leftDot = document.querySelectorAll('.left-dot')[this.selectedLeftIndex] as HTMLElement;
      const rightDot = document.querySelectorAll('.right-dot')[this.selectedRightIndex] as HTMLElement;
      const contentRect = document.querySelector('ion-content')!.getBoundingClientRect();

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

      // Set images as matcehd
      this.beforeImages[this.selectedLeftIndex].matched = true;
      this.afterImages[this.selectedRightIndex].matched = true;
      this.matchedPairs++;

      this.selectedLeftIndex = null;
      this.selectedRightIndex = null;

      // If exercise completed correct it
      if (this.matchedPairs === Object.keys(this.correctPairs).length) {
        this.checkResults();
      }
    }
  }

  checkResults() {
    let allCorrect = true;
    
    for (const leftIndex in this.correctPairs) {
      if (this.userPairs[leftIndex] !== this.correctPairs[leftIndex]) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      alert('Ariketa ondo egin duzu!');
    } else {
      alert('Zerbait gaizki egin duzu...');
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
}
