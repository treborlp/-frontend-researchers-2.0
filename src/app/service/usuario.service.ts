import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Usuarios } from '../clases/usuarios';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {URL_BACKEND} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = URL_BACKEND+"/api/usuarios"

  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.headers.append('Authorization','Bearer '+token);
    }
    return this.headers;
  }

  private isNoAutorizado(error): boolean{
    if(error.status==401){
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(["/login"])
      return true;
    }
    if(error.status==403){
      console.log("No tienes permisos para cambiar esta caracteristica")
      this.router.navigate(["/public"])
      return true;
    }
      return false
    
  }

  getPublicProfileUserByUsername(username: string): Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.url}/public/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
           this.isNoAutorizado(e)
           return throwError(e);
      })
    )
  }

  updateUser(usuario: Usuarios): Observable<Usuarios>{
    return this.http.put<Usuarios>(`${this.url}/${usuario.id}`, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        console.log(e);
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }

  findUserById(id: number): Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.url}/id/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=> {
        console.log(e);
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST', `${this.url}/upload`,formData, {
      reportProgress:true
    });

    return this.http.request(req);

  }

}
