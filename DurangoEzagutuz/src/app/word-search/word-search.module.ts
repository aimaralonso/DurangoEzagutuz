import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WordSearchPage } from './word-search.page';
import { WordsearchComponent } from '../components/wordsearch/wordsearch.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WordsearchComponent,
  ],
  exports: [WordSearchPage],
})
export class WordSearchPageModule {}
