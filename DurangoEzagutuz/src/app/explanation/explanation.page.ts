import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.page.html',
  styleUrls: ['./explanation.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class ExplanationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
