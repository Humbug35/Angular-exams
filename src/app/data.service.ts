import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import 'isomorphic-fetch';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  items = [];
  stream = null;
  token;
  dbx;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    this.stream = new BehaviorSubject(this.items);
      let Dropbox = require('dropbox').Dropbox;
      this.dbx = new Dropbox({ accessToken: this.token });
  }

  getImages(path): any {
    console.log('Path dataservice ', path);
    return this.dbx.filesGetThumbnail({path: decodeURI(path)});

  }

  getItems(path): Observable<any> {
    if (path === "/") {
      path = "";
    }
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    this.dbx.filesListFolder({path: path})
    .then((response) => {
      response.entries.forEach((val) => {
        if (val.path_lower.endsWith("jpg") || val.path_lower.endsWith("png")) {
          this.getImages(val.path_lower).then((imgResp) => {
            val.thumb_image = URL.createObjectURL(imgResp.fileBlob);
            this.stream.next(response.entries);
            console.log(response.entries);
          });
        }
      });
      this.stream.next(response.entries);
    })
    .catch(function(error) {
      console.error(error);
  });
    return this.stream;
  }
}
