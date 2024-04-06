import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, map, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';





import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { Router } from '@angular/router';
import { Logindetails } from '../interfaces/logindetails';
import { Registerdetails } from '../interfaces/register';


interface ResultData {
  token: string;
  user: User;
}
@Injectable({
  providedIn: 'root',
})

export class AuthService { private loggedIn = new BehaviorSubject<LoggedInUser>({
  user: undefined,
  loginState: false,
});

private token: string = '';
username: string = '';

loggedIn$ = this.loggedIn.asObservable(); 

private baseUrl =
  'https://u06-fullstack-recipe-app-harveybong.onrender.com/api/';

private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

constructor(private http: HttpClient, private router: Router) {} 

getLoginStatus() {
  sessionStorage.getItem('token');
  return this.loggedIn.value.loginState;
}


private updateLoginState(loginState: LoggedInUser) {
  this.loggedIn.next(loginState);
}

registerUser(registerDetails: Registerdetails): Observable<ResultData> {
  return this.http
    .post<ResultData>(
      this.baseUrl + 'register',
      registerDetails,
      this.httpOptions
    )
    .pipe(catchError(this.handleError));
}


 
loginUser(loginDetails: Logindetails) {
  console.log('loginUser-method');

  this.http
    .post<any>(this.baseUrl + 'login', loginDetails, this.httpOptions)
    .pipe(catchError(this.handleError))
    .subscribe((result) => {
      console.log(result);

      sessionStorage.setItem('token', result.token); 
      console.log(result.token);

      sessionStorage.setItem('user', JSON.stringify(result.user));
      console.log(result.user);

      this.updateLoginState({
        user: result.user,
        loginState: true,
      });

      console.log();
      this.httpOptions.headers = this.httpOptions.headers.set(
        'Authorization',
        'Bearer ' + result.token
      );
    });
}

getUserToken(): string | null {
  console.log(this.token);
  return this.token;
}

setUsername(name: string) {
  console.log(this.username);
  return (this.username = name);
}

logoutUser() {
  this.updateLoginState({
    user: undefined,
    loginState: false,
  });
  this.httpOptions.headers = this.httpOptions.headers.set(
    'Authorization',
    'Bearer '
  );
  sessionStorage.clear();
}

getCurrentUser() {
  let user: User;

  user = {
    id: 0,
    name: '',
    email: '',
    created_at:'NOW',
  };

  this.http
    .get<User[]>(
      this.baseUrl + 'getUser/' + this.loggedIn.value.user?.id,
      this.httpOptions
    )
    .subscribe((res) => (user = res[0]));
  return user;
}

private handleError(error: HttpErrorResponse) {
  if (error.status === 404) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );
  }
  return throwError(
    () => new Error('Something bad happened; please try again later.')
  );
}
}
