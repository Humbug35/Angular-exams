import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {
  token;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('userLoggedIn')) {
      this.token = localStorage.getItem('userLoggedIn');
      console.log(this.token);
    }
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem(this.token);
  }
}
