import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Researcher } from '../clases/researcher';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Publication } from '../clases/publication';
import {URL_BACKEND} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {

  private url: string = URL_BACKEND+"/api/researcher"

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

  createResearcher(researcher: Researcher): Observable<Researcher>{
    return this.http.post<Researcher>(this.url, researcher, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
           
      })
    )
  }

  updateResearcher(researcher: Researcher): Observable<Researcher>{
    return this.http.put<Researcher>(`${this.url}/${researcher.id}`, researcher, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }

  
  findResearcher(id: number): Observable<Researcher>{
    return this.http.get<Researcher>(`${this.url}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  getResearchers(): Observable<Researcher[]>{
    return this.http.get<Researcher[]>(this.url, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
           this.isNoAutorizado(e)
           return throwError(e);
      })
    )
  }


  checkResearchProfile(id: number): Observable<Researcher>{
    return this.http.get<Researcher>(`${this.url}/user/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    )
  }

  getPublicProfileResearcher(username: string): Observable<Researcher>{
    return this.http.get<Researcher>(`${this.url}/public/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        this.isNoAutorizado(e)
        return throwError(e);
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
