import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchPairsPage } from './match-pairs.page';

const routes: Routes = [
  {
    path: '',
    component: MatchPairsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchPairsPageRoutingModule {}
