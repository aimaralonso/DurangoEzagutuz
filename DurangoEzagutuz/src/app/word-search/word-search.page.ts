import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WordsearchComponent } from '../components/wordsearch/wordsearch.component';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
  standalone: true,
  imports: [IonicModule, WordsearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WordSearchPage {}
