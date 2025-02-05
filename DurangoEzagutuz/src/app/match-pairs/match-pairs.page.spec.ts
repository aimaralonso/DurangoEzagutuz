import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchPairsPage } from './match-pairs.page';

describe('MatchPairsPage', () => {
  let component: MatchPairsPage;
  let fixture: ComponentFixture<MatchPairsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPairsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
