import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Location } from '../classes/location';
import { Geolocation } from '@capacitor/geolocation';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class MapPage implements OnInit {
  // Lista con 5 objetos de la clase AppModels.Location (se asignan id, name e img)
  locations: Location[] = [];
  speechBubbleText: string =
    'Gerturatu <b>Durangoko Udalera </b>jolastu ahal izateko';
  // Propiedad para almacenar la ubicación seleccionada y mostrar la tarjeta
  selectedLocation: Location | null = null;
  selectedLocationId: number | null = null;
  currentStop: number = 1;
  latitude: number = 0;
  longitude: number = 0;
  distance: number = 0;
  isDistanceWithinRange: boolean = false;
  currentLocation: Location = this.locations[this.currentStop - 1];
  useGPS: boolean = true;
  private watchId: string | null = null;
  playAll: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.startLocationUpdates();
    //
  }

  ionViewWillEnter() {
    this.updateCurrentStop();
  }

  getLocations(): void {
    this.databaseService.dbState().subscribe((res) => {
      if (res) {
        this.databaseService.fetchLocations().subscribe((data) => {
          this.locations = data;
          this.currentLocation = this.locations[this.currentStop - 1];
          this.startLocationUpdates();
          this.updateSpeechBubble(
            this.currentLocation.lat,
            this.currentLocation.lon
          );
          document.querySelectorAll('.step').forEach((element) => {
            const img = element as HTMLImageElement;
            const step = img.dataset['step'];
            const stepNumber = step ? parseInt(step, 10) : 0;

            console.log(stepNumber, this.currentStop);

            if (stepNumber <= this.currentStop) {
              img.src = '../../assets/images/pasoLleno.png';
            } else {
              img.src = '../../assets/images/paso.png';
            }
          });
          setTimeout(() => {
            this.updateSpeechBubble(
              this.currentLocation.lat,
              this.currentLocation.lon
            );
          }, 10000);
        });
      }
    });
  }
  ngOnInit() {
    this.getLocations();
    this.currentLocation = this.locations[this.currentStop - 1];
    this.startLocationUpdates();
    this.updateSpeechBubble(this.currentLocation.lat, this.currentLocation.lon);
    document.querySelectorAll('.step').forEach((element) => {
      const img = element as HTMLImageElement;
      const step = img.dataset['step'];
      const stepNumber = step ? parseInt(step, 10) : 0;

      console.log(stepNumber, this.currentStop);

      if (stepNumber <= this.currentStop) {
        img.src = '../../assets/images/pasoLleno.png';
      } else {
        img.src = '../../assets/images/paso.png';
      }
    });
    setTimeout(() => {
      this.updateSpeechBubble(
        this.currentLocation.lat,
        this.currentLocation.lon
      );
    }, 10000);
  }

  setMode(mode: string) {
    this.useGPS = mode === 'gps';
    if (this.useGPS) {
      this.startLocationUpdates();
    } else {
      this.stopLocationUpdates();
    }
  }
  updateSpeechBubble(lat: number, lon: number) {
    //this.distance = this.calculateDistance(lat, lon);
    if (this.isDistanceWithinRange === true) {
      this.speechBubbleText = `<b>${this.currentLocation.name}</b> nahiko gertu daukazu Jolastu ahal duzu`;
    } else {
      this.speechBubbleText = `<b>${
        this.currentLocation.name
      }</b>tik ${Math.round(this.distance * 1000)} metrora zaude`;
    }

    this.cdr.detectChanges(); // Forzar la detección de cambios
  }
  // Abre la tarjeta buscando la ubicación según el id recibido
  openCard(id: number): void {
    this.selectedLocationId = id;
    this.selectedLocation = this.locations.find((loc) => loc.id === id) || null;
  }

  // Cierra la tarjeta
  closeCard(): void {
    this.selectedLocationId = null;
    this.selectedLocation = null;
  }

  async startLocationUpdates() {
    if (!this.useGPS) return;
    try {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000, // tiempo de espera para obtener la ubicación
        maximumAge: 0,
        distanceFilter: 0, //Filtro de distancia para la actualización de la ubicación
      };

      this.watchId = await Geolocation.watchPosition(
        options,
        (position, err) => {
          if (err) {
            console.error('Error obteniendo la ubicación:', err);
            return;
          }
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.distance = this.calculateDistance(
              this.currentLocation.lat,
              this.currentLocation.lon
            );
            this.updateSpeechBubble(
              this.currentLocation.lat,
              this.currentLocation.lon
            );

            this.cdr.detectChanges(); // Forzar la detección de cambios
          }
        }
      );
    } catch (error) {
      console.error('Error iniciando la actualización de ubicación:', error);
    }
  }
  stopLocationUpdates() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }
    this.selectedLocationId = this.currentStop;
    this.currentLocation.lat = this.locations[this.currentStop].lat;
    this.currentLocation.lon = this.locations[this.currentStop].lon;
    this.distance = 0;
    this.isDistanceWithinRange = true;
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }
  calculateDistance(fixedLat: number, fixedLon: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(fixedLat - this.latitude);
    const dLon = toRad(fixedLon - this.longitude);
    const lat1 = toRad(this.latitude);
    const lat2 = toRad(fixedLat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    this.distance = distance;
    this.isDistanceWithinRange = distance <= 0.05; // 50 meters is 0.05 km
    this.cdr.detectChanges(); // Forzar la detección de cambios
    return distance;
  }
  nextLevel(): void {
    this.updateSpeechBubble(this.currentLocation.lat, this.currentLocation.lon);
  }
  goToDescription(): void {
    this.router.navigate(['/description'], {
      state: { location: this.selectedLocationId },
    });
  }

  updateCurrentStop() {
    this.databaseService
      .findBiggestLocationIdWithProgressOne()
      .then((locationId) => {

        if (locationId !== null) {
          if (locationId === 5) {
            this.playAll = true;
          } else {
            this.currentStop = locationId + 1;
          }
        } else {
          this.currentStop = 1;
        }

        this.nextLevel();
      });
  }
}
