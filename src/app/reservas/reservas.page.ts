import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ReservasPage {
  filtro: string = 'todas';

  clases = [
    { nombre: 'Yoga', hora: '7:00', lugares: 3 },
    { nombre: 'Yoga', hora: '10:00', lugares: 5 },
    { nombre: 'Spinning', hora: '13:00', lugares: 7 }
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

        

