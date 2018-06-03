import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  mockedItems = [];
  token;
  stream = null;
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('userLoggedIn')) {
      this.token = localStorage.getItem('userLoggedIn');
      console.log(this.token);
    }
    this.stream = new BehaviorSubject(this.mockedItems);
  }

  login(userInput) {
    console.log('Data from authservice', userInput);
    const ob = this.http.post('/login', userInput);
    ob.subscribe((item: any) => {
      this.token = item.token;
      localStorage.setItem('userLoggedIn', this.token);
      this.router.navigate(['/home']);
    });
    return ob;
  }

  logout() {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }

  getMockedItems(resource): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    const itemsArray = this.http.get(resource, options);
    itemsArray.subscribe((item: any) => {
      this.mockedItems = item;
      this.stream.next(this.mockedItems);
      console.log('AuthService MockedItems', this.mockedItems);
    });
    return this.stream;
  }
}
