import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService, UsuarioLogueado } from '../core/service/auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, CommonModule, RouterModule]
})
export class HomeAdminPage implements OnInit {
  usuario: UsuarioLogueado | null;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = this.authService.getUser();
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  get welcomeText(): string {
    return 'Bienvenido Administrador';
  }

  get subtitleText(): string {
    return 'Desde aquí podés gestionar usuarios y clases.';
  }
}
