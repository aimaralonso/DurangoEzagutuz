import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillnamesPageRoutingModule } from './fillnames-routing.module';

import { FillnamesPage } from './fillnames.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillnamesPageRoutingModule
  ]
})
export class FillnamesPageModule {}
