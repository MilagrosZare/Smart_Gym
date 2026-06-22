export type Role = 'admin' | 'socio';

export interface User {
    id: number;
    nombre: string; 
    apellido: string; 
    email: string;
    password: string;
    rol: Role;
    telefono: number;
}

export interface LoginRequest { /* front envía a back || por si comunicamos con API*/
    email: string;
    password: string;
}

export interface LoginResponse {  /* back devuelve a front si el login fue exitoso || por si comunicamos con API*/
    token: string; 
    usuario: User;
}