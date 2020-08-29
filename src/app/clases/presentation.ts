import { Researcher } from "./researcher";
import { Usuarios } from "./usuarios";

export class Presentation {
    id:number;
    title: string;
    url:string;
    fechaPresentacion: string;
    usuario: Usuarios;
}
