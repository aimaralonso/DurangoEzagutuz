import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Location } from '../classes/location';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.page.html',
  styleUrls: ['./explanation.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class ExplanationPage implements OnInit {
  selectedLocation: Location | null = null;
  locationId: number | null = null;

  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    // Se recupera la ubicación enviada mediante history.state
    this.locationId = history.state.location;

    if (this.locationId !== null) {
      this.getLocations();
    }
  }

  getLocations() {
    this.databaseService.dbState().subscribe((res) => {
      if (res) {
        if (this.locationId !== null) {
          this.databaseService
            .fetchLocationById(this.locationId)
            .subscribe((data) => {
              this.selectedLocation = data;
            });
        }
      }
    });
  }

  goToGame(): void {
    if (this.selectedLocation && this.selectedLocation.explanation) {
      const ruta = this.selectedLocation.activity.toLocaleLowerCase();
      this.router.navigate([`/${ruta}`], {
        state: { location: this.locationId },
      });
    }
  }
}
