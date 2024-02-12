import { Injectable } from '@angular/core';
import { LoginData } from 'src/app/interfaces';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService<LoginData>) { }

  login(userEmail: string, userPassword: string) {
    return this.httpService.postWithHeader(
      {
        email: userEmail,
        password: userPassword
      },
      'auth/login',
    )
  }
}
