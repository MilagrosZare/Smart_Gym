import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class RegistroPage {

  // Datos del formulario
  nombre          = '';
  apellido        = '';
  telefono        = '';
  email           = '';
  password        = '';
  confirmPassword = '';

  // Estado de la pantalla
  loading             = signal(false);
  error               = signal('');
  showPassword        = signal(false);
  showConfirmPassword = signal(false);

  // Se llama cuando se aprieta el botón "Guardar mis datos"
  onSubmit(): void {
    this.error.set('');

    // Verificar que todos los campos están llenos
    if (!this.nombre || !this.apellido || !this.telefono || !this.email || !this.password || !this.confirmPassword) {
      this.error.set('Por favor completá todos los campos.');
      return;
    }

    // Verificar que las contraseñas son iguales
    if (this.password !== this.confirmPassword) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }

    // Verificar contraseña mínima de 6 caracteres
    if (this.password.length < 6) {
      this.error.set('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // TODO: acá va la llamada al backend cuando esté listo
    this.loading.set(true);
    console.log('Datos del nuevo socio:', { nombre: this.nombre, apellido: this.apellido, telefono: this.telefono, email: this.email });
  }
}
