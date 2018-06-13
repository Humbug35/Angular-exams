import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService implements CanActivate {
  token;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      console.log(this.token);
    }
  }
  canActivate(): boolean{
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }
}
