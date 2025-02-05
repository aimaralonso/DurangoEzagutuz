import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordSearchPage } from './word-search.page';

describe('WordSearchPage', () => {
  let component: WordSearchPage;
  let fixture: ComponentFixture<WordSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
