import { App } from '@capacitor/app';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class CongratsPage {

  constructor(private platform: Platform) {}

  closeApp() {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      App.exitApp();
    } else {
      console.log("Closing app...");
    }
  }
}
