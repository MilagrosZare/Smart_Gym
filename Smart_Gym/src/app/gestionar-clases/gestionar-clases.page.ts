import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

interface ClaseAdmin {
  id: number;
  nombre: string;
  horario: string;
  cupoMaximo: number;
  inscritos: string[];
  descripcion: string;
}

@Component({
  selector: 'app-gestionar-clases',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestionar Clases</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="page-header">
        <h2>Administración de Clases</h2>
        <p>Modificá el cupo, el horario y revisá quién está inscripto en cada clase.</p>
      </div>

      <ion-card *ngFor="let clase of clases" class="clase-card">
        <ion-card-header>
          <ion-card-title>{{ clase.nombre }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ clase.descripcion }}</p>

          <ion-list>
            <ion-item>
              <ion-label position="stacked">Horario</ion-label>
              <ion-input [(ngModel)]="clase.horario" placeholder="Ej: Lunes 18:00"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Cupo máximo</ion-label>
              <ion-input type="number" [(ngModel)]="clase.cupoMaximo"></ion-input>
            </ion-item>
          </ion-list>

          <div class="inscriptos-section">
            <h3>Inscriptos ({{ clase.inscritos.length }})</h3>
            <ion-list>
              <ion-item *ngFor="let usuario of clase.inscritos">
                <ion-label>{{ usuario }}</ion-label>
              </ion-item>
              <ion-item *ngIf="clase.inscritos.length === 0">
                <ion-label>No hay usuarios inscriptos todavía.</ion-label>
              </ion-item>
            </ion-list>
          </div>

          <div class="card-actions">
            <ion-button expand="block" color="primary" (click)="guardarCambios(clase)">Guardar cambios</ion-button>
            <ion-button expand="block" fill="outline" color="medium" (click)="verDetalle(clase)">Ver detalle</ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class GestionarClasesPage {
  clases: ClaseAdmin[] = [
    {
      id: 1,
      nombre: 'Yoga',
      horario: 'Lunes 18:00',
      cupoMaximo: 20,
      inscritos: ['Lucía Gómez', 'Mariana Pérez', 'Ana Torres'],
      descripcion: 'Clase suave de yoga para mejorar flexibilidad y reducción de estrés.'
    },
    {
      id: 2,
      nombre: 'Spinning',
      horario: 'Martes 19:30',
      cupoMaximo: 15,
      inscritos: ['Florencia Díaz', 'Camila López'],
      descripcion: 'Entrenamiento cardiovascular intenso en bicicleta estática.'
    }
  ];

  guardarCambios(clase: ClaseAdmin) {
    console.log('Guardando cambios de clase:', clase);
    alert(`Cambios guardados para ${clase.nombre}.`);
  }

  verDetalle(clase: ClaseAdmin) {
    console.log('Detalle de clase:', clase);
    alert(`${clase.nombre}: ${clase.horario} - Cupo: ${clase.cupoMaximo}`);
  }
}
