import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Apunta al controlador que acabamos de arreglar
  private apiUrl = 'http://localhost:8080/api/usuarios'; 

  constructor(private http: HttpClient) {}

  login(credentials: { nombre: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}