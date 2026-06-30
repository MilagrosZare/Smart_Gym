import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
checkmarkOutline, 
ticketOutline, 
closeCircleOutline, 
alertCircleOutline 
} from 'ionicons/icons';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';

addIcons({
'checkmark-outline': checkmarkOutline,
'ticket-outline': ticketOutline,
'close-circle-outline': closeCircleOutline,
'alert-circle-outline': alertCircleOutline
});

interface Reserva {
actividad: string;
fechaHora: string;
codigo: string;
}

@Component({
selector: 'app-ticket-confirmacion',
standalone: true,
imports: [ CommonModule, RouterModule, IonContent, IonButton, IonIcon ],
templateUrl: './ticket-confirmacion.page.html',
styleUrls: ['./ticket-confirmacion.page.scss']
})

export class TicketConfirmacionPage {

cancelada = false;

reserva: Reserva = {
actividad: 'Yoga',
fechaHora: '05/07/2026 · 19:00 hs',
codigo: 'SG-000124'
};

cancelarReserva() {
this.cancelada = true;
}

nuevaReserva() {
// Después agregamos la navegación
}

}