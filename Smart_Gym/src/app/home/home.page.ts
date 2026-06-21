import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule]
})
export class HomePage implements OnInit {
  usuario = signal<User | null>(null);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();

    if (!user) {
      // Si no hay sesión activa, volvemos al login
      this.router.navigate(['/login']);
      return;
    }

    this.usuario.set(user);
  }

  esAdmin(): boolean {
    return this.usuario()?.rol === 'ADMIN';
  }

  reservarClase(): void {
    // TODO: navegar a la pantalla de reservas
    this.router.navigate(['/reservas']);
  }

  gestionSocios(): void {
    // TODO: navegar a la pantalla de gestión
    this.router.navigate(['/gestion-socios']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}