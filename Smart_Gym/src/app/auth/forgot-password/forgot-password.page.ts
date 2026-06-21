import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class ForgotPasswordPage {
  email   = '';
  loading = signal(false);
  error   = signal('');
  enviado = signal(false);

  constructor(private router: Router) {}

  enviarRecupero(): void {
    if (!this.email) {
      this.error.set('Por favor ingresá tu correo electrónico.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    if (!emailValido) {
      this.error.set('El formato del correo no es válido.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    // TODO: reemplazar por llamada real al backend
    // this.authService.forgotPassword(this.email).subscribe({ ... })
    setTimeout(() => {
      this.loading.set(false);
      this.enviado.set(true);
    }, 1500);
  }

  reenviar(): void {
    this.enviado.set(false);
    // Vuelve al paso 1 manteniendo el email para que el usuario pueda reenviar
  }

  volverAlLogin(): void {
    this.router.navigate(['/login']);
  }
}