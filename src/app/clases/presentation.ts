import { Researcher } from "./researcher";

export class Presentation {
    id:number;
    title: string;
    url:string;
    fechaPresentacion: string;
    researcher: Researcher = new Researcher();
}
