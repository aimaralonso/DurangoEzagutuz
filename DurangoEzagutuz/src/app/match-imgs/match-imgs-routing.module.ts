import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchImgsPage } from './match-imgs.page';

const routes: Routes = [
  {
    path: '',
    component: MatchImgsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchImgsPageRoutingModule {}
