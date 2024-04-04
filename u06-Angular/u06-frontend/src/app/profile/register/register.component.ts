import { Component } from '@angular/core';
import { Registerdetails } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerdetails: Registerdetails;

  constructor(private auth: AuthService) {
    this.registerdetails = {
      name: 'Felix',
      email: 'Felixnagy@garga.com ',
      password: '12345678',
      password_confirmation: '12345678',
    };
  }
  registerUser() {
    this.auth.registerNewUser(this.registerdetails);
  }
}