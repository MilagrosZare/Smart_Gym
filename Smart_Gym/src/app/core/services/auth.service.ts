import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/user.model';

const API_URL    = 'http://localhost:8080/api'; // 👈 cambiá por tu URL real
const TOKEN_KEY  = 'sg_token';
const USER_KEY   = 'sg_user';

@Injectable({
providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) {}

// ─── Login ────────────────────────────────────────────────────────────────

login(credentials: LoginRequest): Observable<LoginResponse> {
return this.http.post<LoginResponse>(`${API_URL}/usuarios/login`, credentials).pipe(
    tap(response => {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.usuario));
    })
);
}

// ─── Logout ───────────────────────────────────────────────────────────────

logout(): void {
localStorage.removeItem(TOKEN_KEY);
localStorage.removeItem(USER_KEY);
}

// ─── Estado de sesión ─────────────────────────────────────────────────────

isLoggedIn(): boolean {
return !!this.getToken();
}

// ─── Token ────────────────────────────────────────────────────────────────

getToken(): string | null {
return localStorage.getItem(TOKEN_KEY);
}

// ─── Usuario actual ───────────────────────────────────────────────────────

getCurrentUser(): User | null {
const raw = localStorage.getItem(USER_KEY);
if (!raw) return null;
try {
    return JSON.parse(raw) as User;
} catch {
    return null;
}
}

// ─── Helpers de rol ───────────────────────────────────────────────────────

isAdmin(): boolean {
return this.getCurrentUser()?.rol === 'ADMIN';
}

isSocio(): boolean {
return this.getCurrentUser()?.rol === 'SOCIO';
}
}