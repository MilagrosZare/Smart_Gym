export type Role = 'admin' | 'socio';

export interface User {
    id?: number;
    nombre: string; 
    apellido: string; 
    email: string;
    password: string;
    rol: Role;
    telefono: number;
    activo?: boolean; //Opcional: si la base de datos lo trae como true, se usa.?Operador de propiedad opcional,puede estar o no estar
}
export interface LoginRequest { /* front envía a back || por si comunicamos con API*/
    email: string;
    password: string;
}

export interface LoginResponse {  /* back devuelve a front si el login fue exitoso || por si comunicamos con API*/
    token: string; 
    usuario: User;
}