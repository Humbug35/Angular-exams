import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'isomorphic-fetch';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  items = [];
  stream = null;
  token;
  dbx;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('userLoggedIn')) {
      this.token = localStorage.getItem('userLoggedIn');
      console.log(this.token);
    }
    this.stream = new BehaviorSubject(this.items);
      let Dropbox = require('dropbox').Dropbox;
      this.dbx = new Dropbox({ accessToken: 'hBfKlc457i8AAAAAAAAAfvhDH4N3JkC1xuYS4aj20e2DkxtmrZXiBuqka86427N3' });
  }


  getItems(resource): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    this.dbx.filesListFolder({path: ''})
    .then(function(response) {
    console.log(response);
    })
    .catch(function(error) {
    console.log(error);
  });
    const itemsArray = this.http.get(resource, options);
    itemsArray.subscribe((item: any) => {
      this.items = item;
      this.stream.next(this.items);
      console.log('AuthService MockedItems', this.items);
    });
    return this.stream;
  }
}
