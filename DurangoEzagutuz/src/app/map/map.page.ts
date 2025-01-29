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
  }

}
