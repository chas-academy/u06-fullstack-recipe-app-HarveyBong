import { Component, NgModule } from '@angular/core';
import { Registerdetails } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Register } from '../../models/register.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerObj: Register;
  constructor(private router: Router, private authService: AuthService) {
    this.registerObj = new Register();
  }
  onRegister() {
    console.log(this.registerObj);
    this.authService.postRegister(this.registerObj)?.subscribe({
      next: (res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);

          console.log(localStorage.getItem('token'));

          alert('Register Success');
          this.router.navigateByUrl('/login')

        } else {
          alert(res.message);
        }
      }
    })
  }
  
  }