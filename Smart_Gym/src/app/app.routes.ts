import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
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