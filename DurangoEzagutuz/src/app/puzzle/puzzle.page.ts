import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.page.html',
  styleUrls: ['./puzzle.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})
export class PuzzlePage {
  
  constructor(private router: Router) {}

  navigateToNewPage() {
    this.router.navigate(['/fillnames']);
  }
}
