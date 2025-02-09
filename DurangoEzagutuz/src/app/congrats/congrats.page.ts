import { App } from '@capacitor/app';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class CongratsPage implements OnInit {
  locationId: number | null = null;

  constructor(private platform: Platform, private router: Router,     private dbService: DatabaseService) {}

  handleClick() {
    if (
      (this.platform.is('cordova') || this.platform.is('capacitor')) &&
      this.locationId === 5
    ) {
      App.exitApp();
    } else {
      this.router.navigate(['/map'], {
        state: { location: this.locationId },
      });
    }
  }

  async ngOnInit() {
    this.locationId = history.state.location;
    if (this.locationId !== null) {
      try {
        // Actualiza el progreso a 1 (completado)
        await this.dbService.updateProgress(this.locationId, 1);
        console.log('Progress updated for location:', this.locationId);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  }
}
