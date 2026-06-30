import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export type UserRole = 'ADMINISTRADORGYM' | 'socio' | string;

export interface UsuarioLogueado {
  id: number;
  nombre: string;
  role: UserRole;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private readonly storageKey = 'smart-gym-user';

  constructor(private http: HttpClient) {}

  login(credentials: { nombre: string; contrasena: string }): Observable<UsuarioLogueado> {
    return this.http.post<UsuarioLogueado>(`${this.apiUrl}/login`, credentials).pipe(
      tap((usuario) => {
        localStorage.setItem(this.storageKey, JSON.stringify(usuario));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getUser(): UsuarioLogueado | null {
    const json = localStorage.getItem(this.storageKey);
    return json ? (JSON.parse(json) as UsuarioLogueado) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isAdmin(): boolean {
    const usuario = this.getUser();
    const role = usuario?.nombre?.toString().trim().toLowerCase();
    return !!usuario && role === 'administradorgym';
  }
}
