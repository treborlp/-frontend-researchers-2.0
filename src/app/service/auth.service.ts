import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuarios } from '../clases/usuarios';
import {URL_BACKEND} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuarios;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuarios{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario')!=null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuarios;
      return this._usuario;
    }

    return new Usuarios();
  }

  public get token(): string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }

    return null;
  }

  login(usuario: Usuarios): Observable<any>{
    const urlEndPoint = URL_BACKEND +"/oauth/token";
    const credendiales = btoa("researcherapp"+":"+"123456");
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + credendiales
    });
    
    let parametros = new HttpParams()
    .set("grant_type","password")
    .set("username", usuario.username)
    .set("password",usuario.password);

    //console.log("Aqui se impremen los parametros:" +parametros.toString());
    return this.http.post<any>(urlEndPoint, parametros.toString(), {headers: httpHeaders});

  }

  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);

    this._usuario = new Usuarios();
    this._usuario.id = payload.id_usuario;
    this._usuario.nombre = payload.nombre;
    this._usuario.primerApellido = payload.primer_apellido;
    this._usuario.segundoApellido = payload.segundo_apellido;
    this._usuario.email = payload.email; 
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this._usuario.telefono = payload.telefono;
    this._usuario.direccion = payload.direccion;
    this._usuario.bio = payload.bio;
    this._usuario.ciudad = payload.ciudad;
    this._usuario.country = payload.country;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario)); //guaradamos el usuario en el session storage

  }

  gurdarToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken); //guardamos el toekn el session storage
  }

  obtenerDatosToken(accessToken: string):any{
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);

    if(payload!=null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false; 
  }

  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    //sessionStorage.removeItem("token") por separado
  }

}
