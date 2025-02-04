import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import{ Location } from '../classes/location';

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
    { id: 1, name: 'Ubicacion 1', img: '../../assets/images/prueba.jpg', description: "descripcion 1" } as unknown as Location,
    { id: 2, name: 'Ubicacion 2', img: '../../assets/images/prueba.jpg', description: "descripcion 2" } as unknown as Location,
    { id: 3, name: 'Ubicacion 3', img: '../../assets/images/prueba.jpg' , description: "descripcion 3" } as unknown as Location,
    { id: 4, name: 'Ubicacion 4', img: '../../assets/images/prueba.jpg' , description: "descripcion 4" } as unknown as Location,
    { id: 5, name: 'Ubicacion 5', img: '../../assets/images/prueba.jpg' , description: "descripcion 5" } as unknown as Location,
  ];

  // Propiedad para almacenar la ubicación seleccionada y mostrar la tarjeta
  selectedLocation: Location | null = null;
  selectedLocationId: number | null = null;
  currentStop: number = 3;
  constructor(private router: Router) { }

  ngOnInit() {
    document.querySelectorAll('.step').forEach((element) => {
      const img = element as HTMLImageElement;
      const step = img.dataset['step'];
      const stepNumber = step ? parseInt(step, 10) : 0;
  
      console.log(stepNumber, this.currentStop);
  
      if (stepNumber <= this.currentStop) {
        img.src = "../../assets/images/pasoLleno.png";
      } else {
        img.src = "../../assets/images/paso.png";
      }
    });
  }

  // Abre la tarjeta buscando la ubicación según el id recibido
  openCard(id: number): void {
    this.selectedLocationId = id;
    this.selectedLocation = this.locations.find(loc => loc.id === id) || null;
  }

  // Cierra la tarjeta
  closeCard(): void {
    this.selectedLocationId = null;
    this.selectedLocation = null;
  }

  goToDescription(): void {
    this.router.navigate(['/description'], { state: { location: this.selectedLocation } });
  }
}