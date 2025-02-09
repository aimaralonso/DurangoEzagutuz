import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { Location } from '../classes/location';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})export class DescriptionPage implements OnInit {
  // Propiedad para almacenar la ubicación pasada desde MapPage
  selectedLocation: Location | null = null;
  locationId: number | null = null;

  constructor(private router: Router, private databaseService: DatabaseService) { }

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
          this.databaseService.fetchLocationById(this.locationId).subscribe(data => {this.selectedLocation = data;});
        }
      }
    });
  }

  isVideo(filePath: string): boolean {
    console.log(filePath);
    console.log(this.selectedLocation?.video);
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    const lowerCaseFilePath = filePath.toLowerCase();
    return videoExtensions.some(ext => lowerCaseFilePath.endsWith(ext));
  }
  

  isAudio(filePath: string): boolean {
    console.log(filePath);
    console.log(this.selectedLocation?.audio);
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];
    return audioExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
  }

  goToExplanation(): void {
    this.router.navigate(['/explanation'], {
      state: { location: this.locationId },
    });
  }
  
}
