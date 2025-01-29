import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplanationPage } from './explanation.page';

describe('ExplanationPage', () => {
  let component: ExplanationPage;
  let fixture: ComponentFixture<ExplanationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
