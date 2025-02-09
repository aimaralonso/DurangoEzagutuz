import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-pairs',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './match-pairs.page.html',
  styleUrls: ['./match-pairs.page.scss'],
})
export  class MatchPairsPage implements OnInit {
  names: string[] = [];
  images: { src: string; alt: string }[] = [];
  assignments: { [key: number]: string } = {};
  selectedName: string | null = null;
  selectedNameIndex: number | null = null;
  buttonLabel: string = 'ZUZENDU';
  correctAssignments: { [key: number]: string } = {};
  locationId: number | null = null;

  constructor(private router: Router, private dbService: DatabaseService) {}

  ngOnInit() {
    this.loadMatchPairsData();

    this.locationId = history.state.location;
  }

  loadMatchPairsData() {
    this.dbService.fetchMatchPairs().subscribe((data) => {
      if (data.length) {
        this.names = data.map((item) => item.name);
        this.images = data.map((item) => ({ src: item.image, alt: item.name }));
        this.correctAssignments = data.reduce((acc, item, index) => {
          acc[index] = item.name;
          return acc;
        }, {} as { [key: number]: string });
      }
    });
  }

  selectName(name: string, index: number) {
    this.selectedNameIndex = this.selectedNameIndex === index ? null : index;
    this.selectedName = this.selectedNameIndex !== null ? name : null;
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
      let allCorrect = Object.keys(this.correctAssignments).every((key) => {
        const index = Number(key);
        return this.assignments[index] === this.correctAssignments[index];
      });
      this.buttonLabel = allCorrect ? 'AMAITU' : 'ERREPIKATU';
    } else if (this.buttonLabel === 'ERREPIKATU') {
      this.removeIncorrectAssignments();
    } else {
      this.router.navigate(['/congrats'],{state: { location: this.locationId },});
    }
  }

  removeIncorrectAssignments() {
    Object.keys(this.assignments).forEach((key) => {
      const index = Number(key);
      if (this.assignments[index] !== this.correctAssignments[index]) {
        this.names.push(this.assignments[index]);
        delete this.assignments[index];
      }
    });
    this.buttonLabel = 'ZUZENDU';
  }

  exerciseCompleted(): boolean {
    return Object.keys(this.assignments).length === this.images.length;
  }
}