import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {tap, catchError, retry} from 'rxjs/operators';
import {EnvService} from './env.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(private http: HttpClient, private envService: EnvService) {
  }

  // Handling Errors
  private handleError(error: any) {
      return throwError(error);
  }

  // Post Method Api
  postWithHeader(data: any, suffix: string): Observable<T> {
    const requestOptions = this.customHeader();
      return this.http.post<T>(this.envService.API_URL + suffix, data, requestOptions).pipe(
          tap(( data ) => {
              return data;
          }),
          catchError(this.handleError)
      );
  }

  get(suffix: string): Observable<T> {
    const requestOptions = this.customHeader();
    return this.http.get<T>(this.envService.API_URL + suffix, requestOptions).pipe(
        retry(2),
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
    );
  }

  getAll(suffix: string): Observable<T[]> {
    const requestOptions = this.customHeader();
    return this.http.get<T[]>(this.envService.API_URL + suffix, requestOptions).pipe(
        retry(2),
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
    );
  }

  customHeader() {
    let token = localStorage.getItem('JWT_TOKEN') ?? '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };

    return requestOptions;
  }
}
