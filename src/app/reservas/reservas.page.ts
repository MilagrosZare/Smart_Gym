import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ReservasPage {
  filtro: string = 'todas';

  clases = [
    { nombre: 'Yoga', hora: '7:00', lugares: 3 },
    { nombre: 'Yoga', hora: '10:00', lugares: 5 },
    { nombre: 'Yoga', hora: '18:00', lugares: 4 },
    { nombre: 'Spinning', hora: '8:00', lugares: 6 },
    { nombre: 'Spinning', hora: '13:00', lugares: 7 },
    { nombre: 'Spinning', hora: '19:00', lugares: 2 }
  ];

  constructor(private toastController: ToastController) {}

  get clasesFiltradas() {
    if (this.filtro === 'todas') return this.clases;
    return this.clases.filter(c => c.nombre.toLowerCase() === this.filtro);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'dark'
    });
    await toast.present();
  }
  }
