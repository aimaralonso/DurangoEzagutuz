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
  constructor(private router: Router, private databaseService: DatabaseService) {}
  ngOnInit() {
    // Datos hardcodeados (simulando los datos de la base de datos)
    const hardcodedData = [
      { id: 1, img_before: 'assets/images/Before1.png', img_after: 'assets/images/After1.png' },
      { id: 2, img_before: 'assets/images/Before2.png', img_after: 'assets/images/After2.png' },
      { id: 3, img_before: 'assets/images/Before3.png', img_after: 'assets/images/After3.png' },
      { id: 4, img_before: 'assets/images/Before4.png', img_after: 'assets/images/After4.png' },
      { id: 5, img_before: 'assets/images/Before5.png', img_after: 'assets/images/After5.png' },
    ];
    this.beforeImages = hardcodedData.map(item => ({
      src: item.img_before,
      matched: false,
    }));
    this.afterImages = hardcodedData.map(item => ({
      src: item.img_after,
      matched: false,
    }));
    // Definir los pares correctos basados en los datos hardcodeados
    this.correctPairs = this.createCorrectPairs(hardcodedData);
  }
  createCorrectPairs(data: any[]): { [key: number]: number } {
    let pairs: { [key: number]: number } = {};
    data.forEach((_, index) => {
      pairs[index] = index; // Cada imagen antes coincide con la misma posición después
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
          pair: { left: this.selectedLeftIndex, right: this.selectedRightIndex }, // Asociar la línea con el par
          isCorrect: this.correctPairs[this.selectedLeftIndex] === this.selectedRightIndex, // Marcar si es correcto
        };
        this.lines.push(line);
      }
      this.beforeImages[this.selectedLeftIndex].matched = true;
      this.afterImages[this.selectedRightIndex].matched = true;
      this.matchedPairs++;
      this.updateAllCorrectState(); // Actualizar el estado de allCorrect
      this.selectedLeftIndex = null;
      this.selectedRightIndex = null;
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
    // Filtrar solo las líneas correctas
    this.lines = this.lines.filter(line => line.isCorrect);
    // Reiniciar pares incorrectos
    for (const leftIndex in this.userPairs) {
      const rightIndex = this.userPairs[leftIndex];
      if (this.correctPairs[leftIndex] !== rightIndex) {
        this.beforeImages[leftIndex].matched = false;
        this.afterImages[rightIndex].matched = false;
        this.matchedPairs--;
        delete this.userPairs[leftIndex]; // Eliminar el par incorrecto de userPairs
      }
    }
  }
  updateAllCorrectState() {
    this.allCorrect = true;
    // Verificar si todos los pares son correctos
    for (const leftIndex in this.correctPairs) {
      if (this.userPairs[leftIndex] !== this.correctPairs[leftIndex]) {
        this.allCorrect = false;
        break;
      }
    }
  }
  checkResults() {
    this.updateAllCorrectState(); // Actualizar el estado de allCorrect
    if (!this.allCorrect) {
      this.resetIncorrectPairs(); // Reiniciar pares incorrectos si hay errores
    }
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