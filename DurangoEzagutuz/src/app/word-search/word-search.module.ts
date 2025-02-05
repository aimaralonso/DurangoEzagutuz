import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { WordsearchComponent } from '../components/wordsearch/wordsearch.component';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, WordsearchComponent],
})
export class WordSearchPage {
  constructor() {}
}
