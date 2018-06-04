import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  items = [];
  token;
  stream = null;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('userLoggedIn')) {
      this.token = localStorage.getItem('userLoggedIn');
      console.log(this.token);
    }
    this.stream = new BehaviorSubject(this.items);
  }

  getItems(resource): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    const itemsArray = this.http.get(resource, options);
    itemsArray.subscribe((item: any) => {
      this.items = item;
      this.stream.next(this.items);
      console.log('AuthService MockedItems', this.items);
    });
    return this.stream;
  }
}
