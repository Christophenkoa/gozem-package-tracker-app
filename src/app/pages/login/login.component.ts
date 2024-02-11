import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roleType } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    this._authService.login(
      this.email,
      this.password
    ).subscribe((data) => {
      console.log(data)
      const role = data.user.role.name;

      if(role === roleType.admin) {
        this.router.navigateByUrl('/admin-dashboard')

      }else if(role === roleType.driver) {
        this.router.navigateByUrl('/driver-dashboard')

      }else if(role === roleType.customer) {
        this.router.navigateByUrl('/customer-dashboard')

      }else {
        console.log("user with unknown role.")
      }
    });
  }
}
