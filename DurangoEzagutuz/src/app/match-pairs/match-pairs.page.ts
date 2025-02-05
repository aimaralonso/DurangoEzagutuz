import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-pairs',
  templateUrl: './match-pairs.page.html',
  styleUrls: ['./match-pairs.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})
export class MatchPairsPage {

  // Name list
  names = ['Traganarrua', 'Tartalo', 'Mari', 'Herensugea', 'Sugaar'];

  // Image of each name
  images = [
    { src: 'assets/images/paso.png', alt: 'Tartalo' },
    { src: 'assets/images/paso.png', alt: 'Traganarrua' },
    { src: 'assets/images/paso.png', alt: 'Sugaar' },
    { src: 'assets/images/paso.png', alt: 'Mari' },
    { src: 'assets/images/paso.png', alt: 'Herensugea' },
  ];

  selectedName: string | null = null;
  assignments: { [key: number]: string } = {};
  message: string = '';

  selectName(name: string) {
    this.selectedName = name;
  }

  assignNameToImage(index: number) {
    if (this.assignments[index]) {
      this.names.push(this.assignments[index]);
      delete this.assignments[index];
    } else if (this.selectedName) {
      this.assignments[index] = this.selectedName;

      this.names = this.names.filter((name) => name !== this.selectedName);
  
      this.selectedName = null;
    }
  }   

  // Correct exercise
  checkAssignments() {
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
        allCorrect = false;
        break;
      }
    }

    this.message = allCorrect ? 'Ariketa ondo egin duzu!' : 'Zerbait gaizki egin duzu...';
  }
}
