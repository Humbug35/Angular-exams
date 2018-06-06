import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject, observable} from 'rxjs';
import 'isomorphic-fetch';
import {ActivatedRoute} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  items = [];
  stream = null;
  token;
  dbx;
  path = '';



  constructor(private http: HttpClient, route: ActivatedRoute) {
    if (localStorage.getItem('userLoggedIn')) {
      this.token = localStorage.getItem('userLoggedIn');
      console.log(this.token);
    }
    this.stream = new BehaviorSubject(this.items);
      let Dropbox = require('dropbox').Dropbox;
      this.dbx = new Dropbox({ accessToken: 'hBfKlc457i8AAAAAAAAAfvhDH4N3JkC1xuYS4aj20e2DkxtmrZXiBuqka86427N3' });
  }

  getItems(path): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    //this.path = routerLink;
    //this.path = path;
    this.dbx.filesListFolder({path: this.path})
    .then((response) => {
      this.stream.next(response.entries);
    console.log(response.entries);
    console.log('route dbx: ', this.path)
    })
    .catch(function(error) {
    console.log(error);
  });
    return this.stream;
    /*const itemsArray = this.http.get(path, options);
    itemsArray.subscribe((item: any) => {
      this.items = item;
      this.stream.next(this.items);
      console.log('AuthService MockedItems', this.items);
      console.log('resource: ', path);
    });*/

  }
}
