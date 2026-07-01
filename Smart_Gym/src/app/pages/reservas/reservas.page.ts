import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Clase, ClaseService } from '../../core/service/clase.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ReservasPage implements OnInit {
  filtro: string = 'todas';
  clases: Clase[] = [];
  misClases: Clase[] = [];
  cargando = false;

  constructor(
    private toastController: ToastController,
    private claseService: ClaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  public irAHomeReservas(): void {
    this.router.navigate(['/home-reservas']);
  }

  ngOnInit() {
    this.cargarClases();
    this.cargarMisClases();
  }

  get clasesFiltradas() {
    if (this.filtro === 'todas') return this.clases;
    return this.clases.filter(c => c.nombre?.toLowerCase() === this.filtro);
  }

  lugaresDisponibles(clase: Clase): number {
    const inscritos = clase.usuariosInscritos?.length ?? 0;
    return Math.max(clase.cupoMaximo - inscritos, 0);
  }

  get claseLlena(): (clase: Clase) => boolean {
    return (clase: Clase) => this.lugaresDisponibles(clase) === 0;
  }

  cargarMisClases() {
    const usuario = this.authService.getUser();
    if (!usuario) {
      return;
    }

    this.claseService.getMisClases(usuario.id).subscribe({
      next: (clases) => {
        this.misClases = clases;
      },
      error: (error) => {
        console.error('Error cargando mis clases:', error);
      }
    });
  }

  async cargarClases() {
    this.cargando = true;
    this.claseService.getClases().subscribe({
      next: (clases) => {
        this.clases = clases;
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error cargando clases:', error);
        this.presentToast('No se pudieron cargar las clases. Verificá el backend.');
      }
    });
  }

  isEnrolled(clase: Clase): boolean {
    return this.misClases.some((misClase) => misClase.id === clase.id);
  }

  hasSameType(clase: Clase): boolean {
    return this.misClases.some(
      (misClase) => misClase.nombre?.toLowerCase() === clase.nombre?.toLowerCase() && misClase.id !== clase.id
    );
  }

  canEnroll(clase: Clase): boolean {
    return !this.isEnrolled(clase) && !this.hasSameType(clase) && !this.claseLlena(clase);
  }

  async inscribir(clase: Clase) {
    const usuario = this.authService.getUser();
    if (!usuario) {
      this.presentToast('Necesitás iniciar sesión para reservar.');
      return;
    }

    if (this.isEnrolled(clase)) {
      this.presentToast('Ya estás inscripto en esta clase.');
      return;
    }

    if (this.hasSameType(clase)) {
      this.presentToast(`Ya tenés una clase de ${clase.nombre}. Solo podés inscribirte a una clase de ese tipo.`);
      return;
    }

    if (this.claseLlena(clase)) {
      this.presentToast('La clase ya está completa.');
      return;
    }

    this.claseService.inscribir(clase.id, usuario.id).subscribe({
      next: () => {
        this.presentToast(`Inscripción confirmada en ${clase.nombre} ${clase.horario}`);
        this.cargarClases();
        this.cargarMisClases();
      },
      error: (error) => {
        console.error('Error en inscripción:', error);
        const mensaje = error?.error || 'No se pudo inscribir. Intentá nuevamente.';
        this.presentToast(mensaje);
      }
    });
  }

  async desinscribir(clase: Clase) {
    const usuario = this.authService.getUser();
    if (!usuario) {
      this.presentToast('Necesitás iniciar sesión para desinscribirte.');
      return;
    }

    this.claseService.desinscribir(clase.id, usuario.id).subscribe({
      next: () => {
        this.presentToast(`Se anuló tu inscripción en ${clase.nombre} ${clase.horario}`);
        this.cargarClases();
        this.cargarMisClases();
      },
      error: (error) => {
        console.error('Error en desinscripción:', error);
        const mensaje = error?.error || 'No se pudo desinscribir. Intentá nuevamente.';
        this.presentToast(mensaje);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color: 'dark'
    });
    await toast.present();
  }
}
