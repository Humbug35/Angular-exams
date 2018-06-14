import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import 'isomorphic-fetch';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  mockedRes;
  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private dataService : DataService) {
    this.dataService.stream = new BehaviorSubject(this.dataService.items);
      let Dropbox = require('dropbox').Dropbox;
      this.dataService.dbx = new Dropbox({ accessToken: this.dataService.token });
   }

  serachItem(path): Observable<any> {
    if (path === "/") { path = ""; }
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.dataService.token}`
      })
    };
    this.dataService.dbx.filesListFolder({path: path})
    .then((response) => {
      function search(term) {
        return response.entries.filter((searchvalue) => searchvalue.name.includes(term));
      }
      console.error(search('Cam'))
      //this.dataService.stream.next(search('Cam'));
    })
    .catch(function(error) {
      console.error(error);
  });
    return this.dataService.stream;
  }
}