export interface User {
    id: number;
    nombre: string; 
    apellido: string; 
    email: string;
    rol: 'SOCIO' | 'ADMIN';
    telefono: number;
    activo?: boolean; //Opcional: si la base de datos lo trae como true, se usa.?Operador de propiedad opcional,puede estar o no estar
}