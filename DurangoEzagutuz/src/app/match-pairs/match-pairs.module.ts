import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchPairsPageRoutingModule } from './match-pairs-routing.module';

import { MatchPairsPage } from './match-pairs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchPairsPageRoutingModule
  ]
})
export class MatchPairsPageModule {}
