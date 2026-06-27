import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonSearchbar, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { User } from 'src/app/core/models/user.model';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario-service.service';


@Component({
  selector: 'app-socios-lista',
  templateUrl: './socios-lista.page.html',
  styleUrls: ['./socios-lista.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,IonButton,RouterLink,IonTitle,IonHeader,IonToolbar,IonSearchbar,]
})
export class SociosListaPage implements OnInit {

  
  public listaUsuarios: User[] = [];

  public usuariosFiltrados: User[] = [];

  public textoBuscar: string='';

  public filtroEstado: string='todos';


  
  public cantTotal: number=0;
  public cantActivos: number=0;
  public cantInactivos: number=0;


  constructor(private router: Router,
    private usuarioService: UsuarioService
  ) { }


  public ngOnInit(): void {
    this.cargarUsuarios();
  }

  public cargarUsuarios(): void{
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.listaUsuarios = usuarios;
        this.buscar();
        this.resumenUsuarios();
      },
      error: (err) => {
        console.error('Error al conectar a la base de datos:', err);
      }
    });
  }


  public resumenUsuarios():void {
    this.cantTotal = this.listaUsuarios.length;
    this.cantActivos = this.listaUsuarios.filter(u => u.activo !==false).length
    this.cantInactivos = this.listaUsuarios.filter(u => u.activo === false).length
  }

  public seleccionarEstado(estado: string): void{
    this.filtroEstado= estado;
    this.buscar();
  }

  public buscar (): void{
    let resultado= [...this.listaUsuarios];

    if (this.textoBuscar.trim() !== '') {
      const texto = this.textoBuscar.toLowerCase();
      
      resultado = resultado.filter(
        u => u.nombre.toLowerCase().includes(texto) ||
            u.apellido.toLowerCase().includes(texto) ||
            u.email.toLowerCase().includes(texto) ||
            (u.telefono !== undefined && u.telefono !== null && JSON.stringify(u.telefono).includes(texto))
      );
    }
    
    
    if (this.filtroEstado === 'activo') {
      resultado = resultado.filter(u => u.activo !== false);
    } else if (this.filtroEstado === 'inactivo') {
      resultado = resultado.filter(u => u.activo === false);
    }

    this.usuariosFiltrados = resultado;
  }
  
  
  public irAEditar(usuario: User): void {
    if (!usuario.id){
      alert ('Usuario sin ID valido')
      return;
    }
    this.router.navigate(['/socios-form', usuario.id]);
  }
  
  public alertBorrar(usuario: User): void {
    const confirmar = confirm(`¿Estás seguro/a de que querés dejar inactiva  a ${usuario.nombre} ${usuario.apellido}?`);
    
    if(!confirmar){
      return;
    }


    if (usuario.id === undefined){
      alert('No se puede eliminar un usuario que no posee un ID válido.' )
        return
      } ;
      this.borrarUsuario(usuario.id)
    }
  

  private borrarUsuario(id: number): void {
    this.usuarioService.eliminarUsuario(id).subscribe({
      next: (respuesta) => {
        alert(respuesta.message || 'Se pudo dejar inactiva a la usuaria correctamente.');
        this.cargarUsuarios(); 
      },
      error: (err) => {
        console.error('Error al dejar inactiva a la usuaria:', err);
        alert('Ocurrió un error al intentar dejar inactiva a la usuaria del sistema.');
      }
    });
  }


}




