import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonProgressBar, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../core/service/auth.service';
import { Clase, ClaseService } from '../core/service/clase.service';

@Component({
  selector: 'app-home-reservas',
  templateUrl: './home-reservas.page.html',
  styleUrls: ['./home-reservas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonProgressBar, CommonModule, RouterModule]
})
export class HomeReservasPage implements OnInit {
  usuarioId: number | null = null;
  misClases: Clase[] = [];
  cargando = false;
  cargandoMisClases = false;
  error = '';

  constructor(
    private authService: AuthService,
    private claseService: ClaseService,
    private router: Router
  ) {}

  goToReservas() {
    this.router.navigate(['/reservas']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  ngOnInit() {
    const usuario = this.authService.getUser();
    this.usuarioId = usuario?.id ?? null;
    if (this.usuarioId) {
      this.cargarMisClases();
    }
  }

  cargarMisClases() {
    if (!this.usuarioId) {
      this.error = 'No se encontró el usuario.';
      return;
    }

    this.cargandoMisClases = true;
    this.claseService.getMisClases(this.usuarioId).subscribe({
      next: (clases) => {
        this.misClases = clases;
        this.cargandoMisClases = false;
      },
      error: (err) => {
        console.error('Error cargando mis clases:', err);
        this.error = 'No se pudieron cargar tus clases. Intentá de nuevo.';
        this.cargandoMisClases = false;
      }
    });
  }
}
