import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SociosFormPage } from './socios-form.page';

describe('SociosFormPage', () => {
  let component: SociosFormPage;
  let fixture: ComponentFixture<SociosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SociosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
