import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor (private http: HttpClient) {}
  
  //Mapea
  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  //Registro
  registrarUsuario(usuario: User): Observable<User> {
    const usuarioApi = {
      ...usuario,
      telefono: String(usuario.telefono)
    };
    return this.http.post<User>(`${this.apiUrl}/registrar`, usuarioApi);
  }

  //Leer por ID
  getUsuarioPorId(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  //Actualizar
  actualizarUsuario(id: number, usuario: User): Observable<User>{
    const usuarioApi = {
      ...usuario,
      telefono: JSON.stringify(usuario.telefono)
    }
    return this.http.put<User>(`${this.apiUrl}/${id}`, usuarioApi);
  }

  //Borrar
  eliminarUsuario(id: number): Observable<{ message?: string; error?: string }> {
  return this.http.delete<{ message?: string; error?: string }>(`${this.apiUrl}/${id}`);
  }

  //Ver clases del usuario
  getClasesDelUsuario(id: number): Observable<Array<{ id: number; nombre: string; horario: string; cupoMaximo: number }>> {
  return this.http.get<Array<{ id: number; nombre: string; horario: string; cupoMaximo: number }>>(`${this.apiUrl}/${id}/clases`);
  }
}
