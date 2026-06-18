import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonSearchbar, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { User } from 'src/app/core/models/user.model';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-socios-lista',
  templateUrl: './socios-lista.page.html',
  styleUrls: ['./socios-lista.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,IonButton,RouterLink,IonTitle,IonHeader,IonToolbar,IonSearchbar,]
})
export class SociosListaPage implements OnInit {

  //Lista de prueba- Propiedad, (array de obj que usa molde de la interfaz User)

  listaSocios: User[] = [
    {id: 1, 
    nombre: 'Martina', 
    apellido: 'Soria', 
    email: 'martina.soria@gmail.com', 
    rol: 'SOCIO',
    telefono: 1123456789,
    activo:true,
  },
  {id: 2,
    nombre: 'Jimena',
    apellido: 'Ferreyra',
    email: 'jferreyra@gmail.com',
    rol: 'SOCIO',
    telefono: 1198765432,
    activo:true,
  },
  {id: 3,
    nombre: 'Camila',
    apellido: 'Perez',
    email: 'camperez@gmail.com',
    rol: 'SOCIO',
    telefono: 1131516145,
    activo:false,

  }
  ];

//Propiedad (array vacia de tipo User)Guarda el duplicado de la lista
  public sociosFiltrados: User[] = [];

//Propiedad (t.string) guarda el texto que la admi escribe en busc.  
  public textoBuscar: string='';
//Propiedad(t.string)guarda cual boton de filt esta activo  
  public filtroEstado: string='todos';

//Propiedad (t.number)Guarda n° de los contadores  
  public cantTotal: number=0;
  public cantActivos: number=0;
  public cantinactivos: number=0;

//Inyector,trae herramientas de enrutamiento p/viajar de una pantalla a otra
  constructor(private router: Router) { }


//Metodo obligatorio,se ejecuta solo al iniciar la pantalla
  public ngOnInit(): void {
    this.sociosFiltrados = [...this.listaSocios];
    this.resumenSocios();
  }

//Metodo que recibe un texto,lo guarda en filtroEstado y ejectuta buscador
  public resumenSocios(): void{
    this.cantTotal=this.listaSocios.length;
    this.cantActivos=this.listaSocios.filter(s => s.activo).length;
    this.cantinactivos=this.listaSocios.filter(s=> !s.activo).length;
    
  }

//Metodo (motor de busqueda)Filtra la lista x nom,x apellido,x mail y x boton de estado seleccionada
  public seleccionarEstado(estado: string): void {
    this.filtroEstado= estado;
    this.buscar();
  }

  public buscar() : void {
    let resultado = [...this.listaSocios];

    if (this.textoBuscar.trim() !== ''){
      const texto = this.textoBuscar.toLocaleLowerCase();
      resultado=resultado.filter(
        s => s.nombre.toLocaleLowerCase().includes(texto) ||
        s.apellido.toLocaleLowerCase().includes(texto) ||
        s.email.toLocaleLowerCase().includes(texto) ||
        (s.telefono && String(s.telefono).includes(texto))//convierte numero en string
      );
    }
    
    if (this.filtroEstado === 'activo'){
      resultado=resultado.filter (s => s.activo === true);
    }else if (this.filtroEstado === 'inactivo'){
      resultado=resultado.filter (s => s.activo === false)
    }

    this.sociosFiltrados=resultado;

  }

 //Metodo:de editar,recibe los datos de una socia y lleva a pantalla formulario 
  public irAEditar(socio: User): void {
    console.log('Editando socio:', socio);
    this.router.navigate(['/socios-form']);
  }
  
//Metodo de confirmacion,pregunta si esta seguro de eliminar
  public alertBorrar(socio: User): void {
    const confirmar = confirm(`¿Estás segura de que querés eliminar a ${socio.nombre} ${socio.apellido}?`);
    
    if (confirmar) {
      this.borrarSocio(socio.id);
    }
  }
    
  
  //Metodo privado ,borra a la socia de la lista usando ID y vuelve actualizar la tabla y contadores
  private borrarSocio(id: number): void {
    this.listaSocios = this.listaSocios.filter(s => s.id !== id);
    this.resumenSocios();
    this.buscar();
    
    
    alert('Socio eliminado correctamente.');
  }
}




