import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-pairs',
  templateUrl: './match-pairs.page.html',
  styleUrls: ['./match-pairs.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})
export class MatchPairsPage {
  names = ['Traganarrua', 'Tartalo', 'Herensugea', 'Mari', 'Sugaar'];
  images = [
    { src: 'assets/images/paso.png', alt: 'Tartalo' },
    { src: 'assets/images/paso.png', alt: 'Traganarrua' },
    { src: 'assets/images/paso.png', alt: 'Sugaar' },
    { src: 'assets/images/paso.png', alt: 'Mari' },
    { src: 'assets/images/paso.png', alt: 'Herensugea' },
  ];

  selectedName: string | null = null;
  selectedNameIndex: number | null = null;
  assignments: { [key: number]: string } = {};
  buttonLabel: string = 'ZUZENDU';

  constructor(private router: Router) {}

  selectName(name: string, index: number) {
    if (this.selectedNameIndex === index) {
      this.selectedName = null;
      this.selectedNameIndex = null;
    } else {
      this.selectedName = name;
      this.selectedNameIndex = index;
    }
  }

  assignNameToImage(index: number) {
    if (this.assignments[index]) {
      this.names.push(this.assignments[index]);
      delete this.assignments[index];
    } else if (this.selectedName) {
      this.assignments[index] = this.selectedName;
      this.names = this.names.filter((name) => name !== this.selectedName);
      this.selectedName = null;
      this.selectedNameIndex = null;
    }
  }

  checkAssignments() {
    if (this.buttonLabel === 'ZUZENDU') {
      const correctAssignments: { [key: number]: string } = {
        0: 'Tartalo',
        1: 'Traganarrua',
        2: 'Sugaar',
        3: 'Mari',
        4: 'Herensugea',
      };

      let allCorrect = true;
      for (const index in correctAssignments) {
        const numIndex = Number(index);
        if (this.assignments[numIndex] !== correctAssignments[numIndex]) {
          this.buttonLabel = 'ERREPIKATU';
          allCorrect = false;
          break;
        }
      }
      this.buttonLabel = allCorrect ? 'AMAITU' : 'ERREPIKATU';
    } else if (this.buttonLabel === 'ERREPIKATU') {
      this.removeIncorrectAssignments();
    } else {
      this.router.navigate(['/congrats']);
    }
  }

  removeIncorrectAssignments() {
    const correctAssignments: { [key: number]: string } = {
      0: 'Tartalo',
      1: 'Traganarrua',
      2: 'Sugaar',
      3: 'Mari',
      4: 'Herensugea',
    };
    
    for (const index in this.assignments) {
      const numIndex = Number(index);

      if (this.assignments[numIndex] !== correctAssignments[numIndex]) {
        this.names.push(this.assignments[numIndex]);

        delete this.assignments[numIndex];
      }
    }

    this.buttonLabel = 'ZUZENDU';
  }

  exerciseCompleted(): boolean {
    if (Object.keys(this.assignments).length !== this.images.length) {
      return false;
    }

    return true;
  }
}
