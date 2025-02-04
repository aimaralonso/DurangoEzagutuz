import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchImgsPageRoutingModule } from './match-imgs-routing.module';

import { MatchImgsPage } from './match-imgs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchImgsPageRoutingModule
  ]
})
export class MatchImgsPageModule {}
