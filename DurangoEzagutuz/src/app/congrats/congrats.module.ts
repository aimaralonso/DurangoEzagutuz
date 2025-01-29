import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CongratsPageRoutingModule } from './congrats-routing.module';

import { CongratsPage } from './congrats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CongratsPageRoutingModule,
    CongratsPage,
  ],
})
export class CongratsPageModule {}
