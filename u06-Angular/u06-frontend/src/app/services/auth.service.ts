import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, map, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



import { Register } from '../models/register.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private tokenState: BehaviorSubject<boolean>
  constructor(private http: HttpClient) {
    const initialTokenState = !!localStorage.getItem('token')
    this.tokenState = new BehaviorSubject<boolean>(initialTokenState);
  }
  getTokenState(): Observable<boolean> {
    return this.tokenState.asObservable();
  }
  updateTokenState(): void {
    const hasToken = !!localStorage.getItem('token');
    this.tokenState.next(hasToken);
  }
  postLogin(loginObj: Login) {
    if (!loginObj) return
    console.log(loginObj);
    return this.http.post<any>('https://u06-fullstack-recipe-app-harveybong.onrender.com/api/login', loginObj)
  }
  postRegister(registerObj: Register) {
    if (!registerObj) return
    console.log(registerObj);
    return this.http.post<any>('https://u06-fullstack-recipe-app-harveybong.onrender.com/api/register', registerObj)
  }
  postLogout(token: any) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    console.log(headers);
    return this.http.post<any>('https://u06-fullstack-recipe-app-harveybong.onrender.com/api/logout', {}, {
      headers
    })
  }
}

/*
interface ResultData {
  token: string
}


export class AuthService {
  getLoginStatus(): any {
    throw new Error('Method not implemented.');
  }
 
  private loggedIn = new Subject<boolean>();
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'http://127.0.0.1:8000/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http:HttpClient) { }

  private updateLoginState(loginState: boolean) {
    this.loggedIn.next(loginState);
  }

  loginUser(loginDetails: Login){
    this.http.post<ResultData>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(true);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
      })
  }

  logOut(){
    this.http.post<ResultData>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(false);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
      })
  }
//Register 

registerUser(form: any) {
  this.http.post<any>(this.baseUrl + 'register', form, this.httpOptions).pipe(
    catchError(this.handleError)
  ).subscribe(res => {
    console.log(res);
    console.log(res.token);
    localStorage.setItem("token", res.token);
  });
    
   // console.log("test");
    //console.log(form);
  }

  getUser2(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+'getuser/2', this.httpOptions);
  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}*/