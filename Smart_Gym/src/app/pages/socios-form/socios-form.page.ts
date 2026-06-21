import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, } from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';



@Component({
  selector: 'app-socios-form',
  templateUrl: './socios-form.page.html',
  styleUrls: ['./socios-form.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,RouterLink,IonButton,]
})
export class SociosFormPage implements OnInit {

  //Propiedad,obj molde para el formulario
  public nuevoSocio: User ={
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    rol:'SOCIO',
    telefono: 0,
    activo:true,
  }


  constructor(private router: Router,) { }


  public  ngOnInit(): void {
  }



  //Metodo guardar nuevo socio
  
  
  public guardarSocio(): void {
    // Validación: Si NO hay nombre, o NO hay apellido, o NO hay email, frena el guardado
    if (!this.nuevoSocio.nombre.trim() || !this.nuevoSocio.apellido.trim() || !this.nuevoSocio.email.trim()) {
      alert('Por favor, completa los campos obligatorios (Nombre, Apellido y Email).');
      return;
    }
    
    alert (`¡Socio ${this.nuevoSocio.nombre} ${this.nuevoSocio.apellido} registrado correctamente en Smart Gym!`)
    
    this.router.navigate(['/socios-lista'])
  }
}
