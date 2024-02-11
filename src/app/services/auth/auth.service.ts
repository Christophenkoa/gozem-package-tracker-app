import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userEmail: string, userPassword: string) {
    return this.http.post<LoginData>(
      'http://localhost:8000/api/auth/login',
      {
        email: userEmail,
        password: userPassword
      }
    )
  }
}
