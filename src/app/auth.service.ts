import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  token;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      console.log(this.token);
    }
  }
  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }
}
