import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'app/clases/position';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_BACKEND } from 'app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private url: string = URL_BACKEND + "/api/position";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient) { }

  create(newPosition: Position): Observable<Position>{
    return this.http.post<Position>(this.url, newPosition, {headers: this.headers});
  }
}
