import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchImgsPage } from './match-imgs.page';

describe('MatchImgsPage', () => {
  let component: MatchImgsPage;
  let fixture: ComponentFixture<MatchImgsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchImgsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
