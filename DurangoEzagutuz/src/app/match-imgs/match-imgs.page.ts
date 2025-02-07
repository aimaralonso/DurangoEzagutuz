import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-imgs',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './match-imgs.page.html',
  styleUrls: ['./match-imgs.page.scss'],
})
export class MatchImgsPage implements OnInit {
  beforeImages: any[] = [];
  afterImages: any[] = [];
  correctPairs: { [key: number]: number } = {};
  userPairs: { [key: number]: number } = {};
  lines: any[] = [];
  selectedLeftIndex: number | null = null;
  selectedRightIndex: number | null = null;
  matchedPairs = 0;
  allCorrect: boolean = false;

  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    // Cargar las imágenes de la base de datos
    this.databaseService.fetchMatchImgs().subscribe((data: any[]) => {
      this.beforeImages = data.map(item => ({
        src: item.img_before,
        matched: false,
      }));
      this.afterImages = data.map(item => ({
        src: item.img_after,
        matched: false,
      }));

      // Emparejar las imágenes correctamente (debes definir los pares correctos en función de los datos)
      // Suponiendo que los elementos de la base de datos tienen una relación de índice a índice
      this.correctPairs = this.createCorrectPairs(data);
    });
  }

  createCorrectPairs(data: any[]): { [key: number]: number } {
    // Crea los pares correctos basados en los datos de la base de datos
    let pairs: { [key: number]: number } = {};
    data.forEach((item, index) => {
      pairs[index] = index;  // Suponiendo que el índice izquierdo es igual al índice derecho
    });
    return pairs;
  }

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
    for (const leftIndex in this.userPairs) {
      if (this.userPairs[leftIndex] !== this.correctPairs[leftIndex]) {
        this.beforeImages[leftIndex].matched = false;
        this.afterImages[this.userPairs[leftIndex]].matched = false;
        this.matchedPairs--;
      }
    }

    this.lines = this.lines.filter((line, index) => {
      const leftIndex = Object.keys(this.userPairs)[index];
      return this.userPairs[Number(leftIndex)] === this.correctPairs[Number(leftIndex)];
    });

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
