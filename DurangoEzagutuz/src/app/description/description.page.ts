import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { Location } from '../classes/location';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class DescriptionPage implements OnInit {
  // Propiedad para almacenar la ubicación pasada desde MapPage
  selectedLocation: Location | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    // Se recupera la ubicación enviada mediante history.state
    this.selectedLocation = history.state.location;
    console.log('Ubicación recibida:', this.selectedLocation);
  }
}
