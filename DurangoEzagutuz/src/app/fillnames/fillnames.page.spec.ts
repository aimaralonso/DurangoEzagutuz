import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FillnamesPage } from './fillnames.page';

describe('FillnamesPage', () => {
  let component: FillnamesPage;
  let fixture: ComponentFixture<FillnamesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FillnamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
