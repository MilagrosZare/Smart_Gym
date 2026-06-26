import { Routes } from '@angular/router';
import { authGuard } from './core/service/auth.guard';
import { adminGuard } from './core/service/admin.guard';

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
    canActivate: [authGuard],
  },
  {
    path: 'home-admin',
    loadComponent: () => import('./home-admin/home-admin.page').then((m) => m.HomeAdminPage),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'home-reservas',
    loadComponent: () => import('./home-reservas/home-reservas.page').then((m) => m.HomeReservasPage),
    canActivate: [authGuard],
  },
  {
    path: 'socios-form',
    loadComponent: () => import('./socios-form/socios-form.page').then((m) => m.SociosFormPage),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'socios-lista',
    loadComponent: () => import('./socios-lista/socios-lista.page').then((m) => m.SociosListaPage),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'gestionar-clases',
    loadComponent: () => import('./gestionar-clases/gestionar-clases.page').then((m) => m.GestionarClasesPage),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'reservas',
    loadComponent: () => import('./pages/reservas/reservas.page').then((m) => m.ReservasPage),
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password.page').then((m) => m.ForgotPasswordPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/registro/registro.page').then((m) => m.RegistroPage),
  }
];
