import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordSearchPage } from './word-search.page';

const routes: Routes = [
  {
    path: '',
    component: WordSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordSearchPageRoutingModule {}
