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

  constructor(private http: HttpClient, route: ActivatedRoute) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    this.stream = new BehaviorSubject(this.items);
      let Dropbox = require('dropbox').Dropbox;
      this.dbx = new Dropbox({ accessToken: this.token });
  }

  getItems(path): Observable<any> {
    console.log('path from getItems Param: ', path);
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    //this.path = routerLink;
    //this.path = path;
    this.dbx.filesListFolder({path: path})
    .then((response) => {
      this.stream.next(response.entries);
    console.log(response.entries);
    console.log('route dbx: ', path)
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
