import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { AsyncPipe } from '@angular/common';
import { Login} from '../models/login.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe,FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;
  constructor(private router: Router, private authService: AuthService) {
    this.loginObj = new Login();
    console.log(this.loginObj);
  }
  onLogin() {
    this.authService.postLogin(this.loginObj)?.subscribe({
      next: (res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.authService.updateTokenState()
          console.log(localStorage.getItem('token'));

          alert('Login Success');
          this.router.navigateByUrl('')

        } else {
          alert(res.message);
        }
      }
    })
}
}