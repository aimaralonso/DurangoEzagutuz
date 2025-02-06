import { Component } from '@angular/core';
import { IonicModule,  AlertController} from '@ionic/angular';
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
  
  constructor(private router: Router, private alertController: AlertController) {}

  async navigateToNewPage() {
    const alert = await this.alertController.create({
      header: 'Baieztatu',
      message: 'Seguru puzzlea amaitu duzula?',
      buttons: [
        {
          text: 'EZ',
          role: 'cancel'
        },
        {
          text: 'BAI',
          handler: () => {
            this.router.navigate(['/fillnames']);
          }
        }
      ]
    });
    await alert.present();
  }
}
