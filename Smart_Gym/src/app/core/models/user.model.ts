export interface User {
    id: number;
    nombre: string; 
    apellido: string; 
    email: string;
    rol: 'SOCIO' | 'ADMIN';
    telefono: number;
}


export interface LoginRequest { /* front envía a back */
    email: string;
    password: string;
}

export interface LoginResponse {  /* back devuelve a front si el login fue exitoso */
    token: string; 
    usuario: User;
}