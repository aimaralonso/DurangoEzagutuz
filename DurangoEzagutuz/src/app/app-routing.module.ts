import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapPage } from './map/map.page';
import { DescriptionPage } from './description/description.page';
import { HomePage } from './home/home.page';
import { ExplanationPage } from './explanation/explanation.page';
import { CongratsPage } from './congrats/congrats.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'map', component: MapPage },
  { path: 'description', component: DescriptionPage },
  { path: 'explanation', component: ExplanationPage },
  { path: 'congrats', component: CongratsPage },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'match_img',
    loadChildren: () => import('./match-imgs/match-imgs.module').then( m => m.MatchImgsPageModule)
  },
  {
    path: 'matchpairs',
    loadChildren: () => import('./match-pairs/match-pairs.module').then( m => m.MatchPairsPageModule)
  },
  {
    path: 'puzzle',
    loadChildren: () => import('./puzzle/puzzle.module').then( m => m.PuzzlePageModule)
  },
  {
    path: 'fillnames',
    loadChildren: () => import('./fillnames/fillnames.module').then( m => m.FillnamesPageModule)
  },
  {
    path: 'wordsearch',
    loadComponent: () => import('./word-search/word-search.page').then(m => m.WordSearchPage),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
