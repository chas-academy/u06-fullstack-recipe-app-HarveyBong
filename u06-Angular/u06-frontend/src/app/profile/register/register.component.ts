import { Component, NgModule } from '@angular/core';
import { Registerdetails } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl('')
  })
  
  // Register 
  
  registerDetails: Registerdetails;
  
  constructor(private auth: AuthService) {
    this.registerDetails = {
      name:"",
      email:"", 
      password:"", 
      password_confirmation:"",
      
    }
  
  }
  register(){
    this.auth.registerUser(this.form.value)
    console.log('Register success')
  }
  
  
  }