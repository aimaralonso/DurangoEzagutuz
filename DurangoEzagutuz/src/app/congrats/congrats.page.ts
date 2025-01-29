import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class CongratsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
