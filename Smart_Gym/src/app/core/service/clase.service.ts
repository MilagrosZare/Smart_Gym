import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clase {
  id: number;
  nombre: string;
  horario: string;
  cupoMaximo: number;
  usuariosInscritos?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private apiUrl = 'http://localhost:8080/api/clases';

  constructor(private http: HttpClient) {}

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }

  inscribir(claseId: number, usuarioId: number): Observable<Clase> {
    return this.http.post<Clase>(`${this.apiUrl}/${claseId}/inscribir/${usuarioId}`, {});
  }

  desinscribir(claseId: number, usuarioId: number): Observable<Clase> {
    return this.http.delete<Clase>(`${this.apiUrl}/${claseId}/desinscribir/${usuarioId}`);
  }

  getMisClases(usuarioId: number): Observable<Clase[]> {
    return this.http.get<Clase[]>(`http://localhost:8080/api/usuarios/${usuarioId}/clases`);
  }
}
