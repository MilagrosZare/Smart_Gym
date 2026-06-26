import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, } from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UsuarioService } from 'src/app/core/services/usuario-service.service';


@Component({
  selector: 'app-socios-form',
  templateUrl: './socios-form.page.html',
  styleUrls: ['./socios-form.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,RouterLink,IonButton,]
})
export class SociosFormPage implements OnInit {

  
  public nuevoUsuario: User ={
    nombre: '',
    apellido: '',
    email: '',
    password:'smartgym_123',
    rol: 'socio',
    telefono: '',
    activo:true,
  }

  public esEdicion = false;
  private usuarioId?: number;
  

  public errorNombre = signal('');
  public errorApellido = signal('');
  public errorEmail = signal('');
  public errorTelefono = signal('');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) 
  { }


  public  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // 👈 Lee el ':id' de la URL de forma limpia
      
      if (idParam) {
        this.usuarioId = Number(idParam);
        this.esEdicion = true;
        this.cargarUsuarioParaEditar(this.usuarioId);
      }
    });
  }

  
  private cargarUsuarioParaEditar(id: number): void {
    this.usuarioService.getUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.nuevoUsuario = usuario;
        this.validarCampos();
      },
      error: (err) => {
        console.error('Error al traer los datos del usuario:', err);
      }
    });
  }

  public validarCampos(): boolean {
    // Reseteamos todos los textos
    this.errorNombre.set('');
    this.errorApellido.set('');
    this.errorEmail.set('');
    this.errorTelefono.set('');

    // Validar Nombre y Apellido
    if (!this.nuevoUsuario.nombre?.trim()) this.errorNombre.set('El nombre es obligatorio.');
    if (!this.nuevoUsuario.apellido?.trim()) this.errorApellido.set('El apellido es obligatorio.');

    // Validar Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.nuevoUsuario.email?.trim()) {
      this.errorEmail.set('El correo electrónico es obligatorio.');
    } else if (!emailRegex.test(this.nuevoUsuario.email.trim())) {
      this.errorEmail.set('Formato de correo inválido (ej: usuario@gym.com).');
    }

    // Validar Teléfono
    const telLimpio = String(this.nuevoUsuario.telefono || '').trim();
    const telRegex = /^[0-9]{8,11}$/;
    if (!telLimpio) {
      this.errorTelefono.set('El teléfono es obligatorio.');
    } else if (!telRegex.test(telLimpio)) {
      this.errorTelefono.set('Debe contener solo números (entre 8 y 11 dígitos).');
    }

    // Si todos los signals están vacíos, el formulario es válido
    return !this.errorNombre() && !this.errorApellido() && !this.errorEmail() && !this.errorTelefono();
  }

  
  public guardarUsuario(): void {
    if (!this.validarCampos()) return;

    this.nuevoUsuario.telefono = String(this.nuevoUsuario.telefono).trim();
    this.nuevoUsuario.email = this.nuevoUsuario.email.trim();

    const request$ = this.esEdicion && this.usuarioId !== undefined
      ? this.usuarioService.actualizarUsuario(this.usuarioId, this.nuevoUsuario)
      : this.usuarioService.registrarUsuario(this.nuevoUsuario);

    request$.subscribe({
      next: (u) => {
        alert(`¡Socia ${u.nombre} procesada con éxito!`);
        this.router.navigate(['/socios-lista']);
      },
      error: (err) => console.error('Error en API:', err)
    });
  }
}
