import { Injectable } from '@angular/core';
import { LoginData, roleType } from 'src/app/interfaces';
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
  // Returns true when user is logged.
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.email !== null;
  }

  // Checks user's role.
  isUserRole(role: roleType): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user) {
      return user.role.name == role;
    }

    return false;
  }

  public cleanLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('JWT_TOKEN');
  }
}
