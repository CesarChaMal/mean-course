import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private uri = 'http://localhost:3000/api/user/';

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post(this.uri + 'signup', authData)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post(this.uri + 'login', authData)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }
}
