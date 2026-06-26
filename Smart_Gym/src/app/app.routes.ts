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
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
    {
    path: 'reservas',
    loadComponent: () => import('./pages/reservas/reservas.page').then(m => m.ReservasPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'socios-form/:id', 
    loadComponent: () => import('./pages/socios-form/socios-form.page').then(m => m.SociosFormPage),
  },
  {
    path: 'socios-form',
    loadComponent: () => import('./pages/socios-form/socios-form.page').then(m => m.SociosFormPage),
  },
  {
    path: 'socios-lista',
    loadComponent: () => import('./pages/socios-lista/socios-lista.page').then(m => m.SociosListaPage),
  }

];