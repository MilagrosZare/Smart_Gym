import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent} from '@ionic/angular/standalone';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})

export class LoginPage {

  email = '';
  password = '';

  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

    constructor (private router : Router) {}

  onSubmit() { // Se activa cuando se toca botón Ingresar
    this.error.set('');

    if (this.email === '' || this.password === '') {
      this.error.set('Completá todos los campos.');
      return;
    }

    if (this.email === 'admin@smartgym.com' && this.password === 'admin123') {
      this.router.navigate(['/home']);
    } else if (this.email === 'socia@smartgym.com' && this.password === 'socia123') {
      this.router.navigate(['/home']);
    } else {
      this.error.set('Email o contraseña incorrectos.');
    }
  
  }
    recuperarContrasena() {
    this.router.navigate(['/forgot-password'])
  }

}