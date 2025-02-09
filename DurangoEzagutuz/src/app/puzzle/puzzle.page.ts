import { Component, OnInit } from '@angular/core';
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
export class PuzzlePage  implements OnInit {
  locationId: number | null = null;
  
  constructor(private router: Router, private alertController: AlertController) {}
  ngOnInit() {

    this.locationId = history.state.location;
  }

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
            this.router.navigate(['/fillnames'],{state: { location: this.locationId },});
          }
        }
      ]
    });
    await alert.present();
  }
}
