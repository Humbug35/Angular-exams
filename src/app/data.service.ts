import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import 'isomorphic-fetch';


@Injectable({ providedIn: 'root' })
export class DataService {
  items = [];
  stream = null;
  token;
  dbx;
  fileURL;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    this.stream = new BehaviorSubject(this.items);
      let Dropbox = require('dropbox').Dropbox;
      this.dbx = new Dropbox({ accessToken: this.token });
  }

  getImages(path): any { return this.dbx.filesGetThumbnail({path: decodeURI(path)}); }

  downloadFile(e) {
    const path = decodeURI(e);
    this.dbx.filesDownload({path: path})
      .then((file) => {
        const blob = file.fileBlob;
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = this.fileURL.changingThisBreaksApplicationSecurity;
        a.download = file.name;
        a.click();
      });
  }

  getItems(path): Observable<any> {
    if (path === "/") { path = ""; }
    this.dbx.filesListFolder({path: path})
      .then((response) => {
        response.entries.forEach((val) => {
          if (val.path_lower.endsWith("jpg") || val.path_lower.endsWith("png")) {
            this.getImages(val.path_lower)
              .then((imgResp) => {
                val.thumb_image = URL.createObjectURL(imgResp.fileBlob);
                this.stream.next(response.entries);
            });
          }
        });
        this.stream.next(response.entries);
      })
    .catch(function(error) {
      console.error('Error message when getting items: ', error);
  });
    return this.stream;
  }
}
