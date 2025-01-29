import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class DescriptionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
