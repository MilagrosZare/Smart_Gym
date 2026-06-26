import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService, UsuarioLogueado } from '../core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, RouterModule]
})
export class HomePage implements OnInit {
  usuario: UsuarioLogueado | null;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = this.authService.getUser();
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    if (!this.isAdmin) {
      this.router.navigate(['/home-reservas'], { replaceUrl: true });
    }
  }

  get welcomeText(): string {
    return this.isAdmin ? 'Bienvenido Administrador' : 'Bienvenido a Smart Gym';
  }

  get subtitleText(): string {
    return this.isAdmin
      ? 'Podés gestionar usuarios y clases desde aquí.'
      : 'Accedé a tus reservas y veé las clases disponibles.';
  }
}
