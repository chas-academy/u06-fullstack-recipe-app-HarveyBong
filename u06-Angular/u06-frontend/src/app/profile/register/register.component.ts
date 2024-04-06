import { Component, NgModule } from '@angular/core';
import { Registerdetails } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private auth: AuthService) {}

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required),
  });

  password = this.registerForm.value.password;
  password_confirmation = this.registerForm.value.password_confirmation;

  register() {
    console.log('register-method');
    const registerData = this.registerForm.value;
    console.log('...');
    console.log(registerData);
    this.auth
      .registerUser(registerData as Registerdetails)
      .subscribe((result) => {
        console.log('Success', result);
      });
  }
}