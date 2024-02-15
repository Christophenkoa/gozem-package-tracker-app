import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {tap, catchError, retry} from 'rxjs/operators';
import {EnvService} from './env.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

   headers = new HttpHeaders()
       // .set( 'Access-Control-Allow-Origin','*')
       .set('Content-Type', 'application/json')
       .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
       .set('Access-Control-Allow-Origin', '*')
       .set('Accept', 'application/json');

  public httpOptions = {
    headers: this.headers,
  };

  public httpOptions2 = {
    headers: this.headers,
  };

  constructor(private http: HttpClient, private envService: EnvService) {
  }

    // Handling Errors
    private handleError(error: any) {
        return throwError(error);
    }

    // Post Method Api
    post(data: any, suffix: string): Observable<T> {
        return this.http.post<T>(this.envService.API_URL + suffix, data, this.httpOptions).pipe(
            tap(( data ) => {
                return data;
            }),
            catchError(this.handleError)
        );
    }

    // Post Method Api
    postWithHeader(data: any, suffix: string): Observable<T> {
    let token = localStorage.getItem('JWT_TOKEN');
      const headers2 = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const requestOptions = { headers: headers2 };
        return this.http.post<T>(this.envService.API_URL + suffix, data, requestOptions).pipe(
            tap(( data ) => {
                return data;
            }),
            catchError(this.handleError)
        );
    }

    get(suffix: string): Observable<T> {
        return this.http.get<T>(this.envService.API_URL + suffix).pipe(
            retry(2),
            tap((data) => {
              return data;
            }),
            catchError(this.handleError)
        );
    }

    getAll(suffix: string): Observable<T[]> {
      return this.http.get<T[]>(this.envService.API_URL + suffix).pipe(
          retry(2),
          tap((data) => {
            return data;
          }),
          catchError(this.handleError)
      );
    }

    getSub(suffix: string): Observable<T> {
        return this.http.get<T>(this.envService.API_URL + suffix, this.httpOptions).pipe(
            retry(2),
            tap((data) => {
              return data;
            }),
            catchError(this.handleError)
        );
    }
}
