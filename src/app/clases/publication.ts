import { Usuarios } from './usuarios';

export class Publication {
    id: number;
    authors: string;
    title:string;
    journal:string;
    type:string;
    doiUrl:string;
    usuario: Usuarios;
}
