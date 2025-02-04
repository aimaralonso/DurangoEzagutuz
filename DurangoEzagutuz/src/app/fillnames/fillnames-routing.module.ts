import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillnamesPage } from './fillnames.page';

const routes: Routes = [
  {
    path: '',
    component: FillnamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillnamesPageRoutingModule {}
