export class User {
    email: string;
    password: string;
} 

export class UserR {
    nombre: string;
    email: string;
    password: string;
    uid: string;
    status: 'premium' | 'free';
    plan:  'mes' | 'forever';
}