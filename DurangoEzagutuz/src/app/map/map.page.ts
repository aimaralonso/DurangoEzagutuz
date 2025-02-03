import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule  } from '@ionic/angular';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class MapPage implements OnInit {
  constructor() { }

  ngOnInit() {
    const currentStop = 2; 

    document.querySelectorAll('.step').forEach((element) => {
      const img = element as HTMLImageElement;
      const stepNumber = parseInt(img.dataset['step'] || '0', 10);
      
      console.log(stepNumber, currentStop);
      
      if (stepNumber <= currentStop) {
          img.src = "../../assets/images/pasoLleno.png";
      } else {
          img.src = "../../assets/images/paso.png";
      }
    });
  }
}
