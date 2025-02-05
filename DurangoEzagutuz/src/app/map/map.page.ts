import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Location } from '../classes/location';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class MapPage implements OnInit {
  // Lista con 5 objetos de la clase AppModels.Location (se asignan id, name e img)
  locations: Location[] = [
    {
      id: 1,
      name: 'Ubicacion 1',
      img: '../../assets/images/prueba.jpg',
      lat: 43.1709785,
      lon: -2.630629,
      description: 'descripcion 1',
    } as unknown as Location,
    {
      id: 2,
      name: 'Ubicacion 2',
      img: '../../assets/images/prueba.jpg',
      lat: 43.1679499,
      lon: -2.6316685,
      description: 'descripcion 2',
    } as unknown as Location,
    {
      id: 3,
      name: 'Ubicacion 3',
      img: '../../assets/images/prueba.jpg',
      /* lat: 43.1668907,
      lon: -2.6318913 */ //Ubicacion 3 Real
      lat: 43.17937173107523, //Ubicacion cercana a la uni para testeos
      lon: -2.4899719,
      description: 'descripcion 3',
    } as unknown as Location,
    {
      id: 4,
      name: 'Ubicacion 4',
      img: '../../assets/images/prueba.jpg',
      lat: 43.1657721,
      lon: -2.6320561,
      description: 'descripcion 4',
    } as unknown as Location,
    {
      id: 5,
      name: 'Ubicacion 5',
      img: '../../assets/images/prueba.jpg',
      lat: 43.1649113,
      lon: -2.6324657,
      description: 'descripcion 5',
    } as unknown as Location,
  ];
  speechBubbleText: string =
    'Gerturatu <b>Durangoko Udalera </b>jolastu ahal izateko';
  // Propiedad para almacenar la ubicación seleccionada y mostrar la tarjeta
  selectedLocation: Location | null = null;
  selectedLocationId: number | null = null;
  currentStop: number = 3;
  latitude: number = 0;
  longitude: number = 0;
  distance: number = 0;
  isDistanceWithinRange: boolean = false;
  currentLocation: Location = this.locations[this.currentStop];
  useGPS: boolean = true;
  private watchId: string | null = null; // Añadir watchId para controlar la geolocalización
  constructor(private cdr: ChangeDetectorRef, private router: Router) {
    this.startLocationUpdates();
  }

  ngOnInit() {
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
    if (this.currentStop < this.locations.length) {
      this.currentStop++;
      this.currentLocation = this.locations[this.currentStop - 1];
      this.updateSpeechBubble(
        this.currentLocation.lat,
        this.currentLocation.lon
      );
    }
  }
  goToDescription(): void {
    this.router.navigate(['/description'], {
      state: { location: this.selectedLocation },
    });
  }
}
