import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SociosListaPage } from './socios-lista.page';

describe('SociosListaPage', () => {
  let component: SociosListaPage;
  let fixture: ComponentFixture<SociosListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SociosListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
