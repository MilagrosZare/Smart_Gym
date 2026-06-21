import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class LoginPage {

  
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);
  
  constructor (private router : Router) {}

    recuperarContrasena() {
    this.router.navigate(['/forgot-password'])
  }

}