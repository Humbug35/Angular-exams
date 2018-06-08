import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  token;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('userLoggedIn')) {
      this.token = localStorage.getItem('userLoggedIn');
      console.log(this.token);
    }
  }

  /*login(userInput) {
    console.log('Data from authservice', userInput);
    const ob = this.http.post('/login', userInput);
    ob.subscribe((item: any) => {
      this.token = item.token;
      localStorage.setItem('userLoggedIn', this.token);
      this.router.navigate(['/home']);
    });
    return ob;
  }*/

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
