import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'socios-lista',
    loadComponent: () => import('./pages/socios-lista/socios-lista.page').then( m => m.SociosListaPage)
  },
  {
    path: 'socios-form',
    loadComponent: () => import('./pages/socios-form/socios-form.page').then( m => m.SociosFormPage)
  },
];
