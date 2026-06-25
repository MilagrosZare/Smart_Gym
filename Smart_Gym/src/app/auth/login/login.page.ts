import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service'; // Ajustá la ruta relativa si es necesario

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class LoginPage {

  // Mantenemos estas variables para no tener que romper el [(ngModel)] de tu HTML actual
  email = ''; 
  password = '';

  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

  // Inyectamos el servicio de autenticación en el constructor
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() { // Se activa cuando se toca el botón Ingresar
    this.error.set('');

    if (this.email === '' || this.password === '') {
      this.error.set('Completá todos los campos.');
      return;
    }

    this.loading.set(true);

    // Mapeamos los datos para que coincidan con las llaves que lee el Map de Java
    const datosLogin = {
      nombre: this.email,       // Tu input 'email' viaja como el campo 'nombre'
      contrasena: this.password // Tu input 'password' viaja como 'contrasena'
    };

    // Consumimos el endpoint real de tu backend
    this.authService.login(datosLogin).subscribe({
      next: (response) => {
        this.loading.set(false);
        console.log('¡Login exitoso! Datos del usuario:', response);
        
        // Si más adelante necesitás el ID o el Rol del usuario, podés guardarlo acá:
        // localStorage.setItem('usuario_logeado', JSON.stringify(response));
        
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Error en el login:', err);
        
        if (err.status === 401) {
          this.error.set('Nombre de usuario o contraseña incorrectos.');
        } else {
          this.error.set('Error de conexión con el servidor. Asegurate de que el backend esté corriendo.');
        }
      }
    });
  }

  recuperarContrasena() {
    this.router.navigate(['/forgot-password']);
  }
}