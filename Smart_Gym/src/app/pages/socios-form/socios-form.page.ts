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
    telefono: 0,
    activo:true,
  }

  public edicion = false;
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
      const idParam = params.get('id'); 
      
      if (idParam) {
        this.usuarioId = Number(idParam);
        this.edicion = true;
        this.cargarUsuarioParaEditar(this.usuarioId);
      }
    });
  }

  
  private cargarUsuarioParaEditar(id: number): void {
    this.usuarioService.getUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.nuevoUsuario = usuario;
        this.nuevoUsuario.telefono = Number(usuario.telefono);
      },
      error: (err) => {
        console.error('Error al traer los datos del usuario:', err);
      }
    });
  }

  public validarCampos(): boolean {
    
    this.errorNombre.set('');
    this.errorApellido.set('');
    this.errorEmail.set('');
    this.errorTelefono.set('');

    
    if (!this.nuevoUsuario.nombre?.trim()) this.errorNombre.set('El nombre es obligatorio.');
    if (!this.nuevoUsuario.apellido?.trim()) this.errorApellido.set('El apellido es obligatorio.');

    
    const emailValidacion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.nuevoUsuario.email?.trim()) {
      this.errorEmail.set('El correo electrónico es obligatorio.');
    } else if (!emailValidacion.test(this.nuevoUsuario.email.trim())) {
      this.errorEmail.set('Formato de correo inválido (ej: usuario@gym.com).');
    }

    
    const telefonoEnTexto = JSON.stringify(this.nuevoUsuario.telefono || 0);
    const telLimpio = telefonoEnTexto.trim();
    const telValidacion = /^[0-9]{8,11}$/;
    
    if (!this.nuevoUsuario.telefono || telLimpio === '0') {
      this.errorTelefono.set('El teléfono es obligatorio.');
    } else if (!telValidacion.test(telLimpio)) {
      this.errorTelefono.set('Debe contener solo números (entre 8 y 11 dígitos).');
    }
    return !this.errorNombre() && !this.errorApellido() && !this.errorEmail() && !this.errorTelefono();
  }

  
  public guardarUsuario(): void {
    if (!this.validarCampos()) return;

    this.nuevoUsuario = JSON.parse(JSON.stringify(this.nuevoUsuario));
    
    this.nuevoUsuario.email = this.nuevoUsuario.email.trim();
    
    this.nuevoUsuario.telefono = Number(this.nuevoUsuario.telefono);
    
    const payload = {
    ...this.nuevoUsuario,
    telefono: String(this.nuevoUsuario.telefono)
    };

    const request$ = this.edicion && this.usuarioId !== undefined
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
