import { Injectable } from '@angular/core';
import { URL_BACKEND } from 'app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { Presentation } from 'app/clases/presentation';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  private url: string = URL_BACKEND + "/api/presentation";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.headers.append('Authorization', 'Bearer ' + token);
    }
    return this.headers;
  }

  private isNoAutorizado(error): boolean {

    if (error.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }

      this.router.navigate(["/login"])
      return true;
    }
    if (error.status == 403) {
      console.log("No tienes permisos para cambiar esta caracteristica")
      this.router.navigate(["/public"])
      return true;
    }
    return false

  }

  createNewPresentation(presentation: Presentation): Observable<Presentation>{
    return this.http.post<Presentation>(this.url, presentation, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }

  getPresentationById(idUsuario: number): Observable<Presentation[]>{
    return this.http.get<Presentation[]>(`${this.url}s/${idUsuario}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    ) 
  }

  editPresentationById(presentation: Presentation): Observable<Presentation>{
    return this.http.put<Presentation>(`${this.url}/${presentation.id}`,presentation, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }

  

}
