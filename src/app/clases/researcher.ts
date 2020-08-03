import { Usuarios } from './usuarios';
import { Publication } from './publication';

export class Researcher {
    id: number;
    maxDegree: String;
    profileCTIVitae: String;
    profileGoogleScholar: String;
    profileOrcid: String;
    publications: Publication[]=[];
    usuario: Usuarios;
}
