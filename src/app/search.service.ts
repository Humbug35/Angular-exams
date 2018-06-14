import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'isomorphic-fetch';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  res;
  searchKeyword = '';
  
  constructor(private dataService : DataService) {
    this.dataService.stream = new BehaviorSubject(this.dataService.items);
      let Dropbox = require('dropbox').Dropbox;
      this.dataService.dbx = new Dropbox({ accessToken: this.dataService.token });
   }

  catchSearchKey(term) {
    this.searchKeyword = term;
    return this.searchKeyword;
  }

  searchItem(path): Observable<any> {
    if (path === "/") { path = ""; }
    this.dataService.dbx.filesListFolder({path: path})
    .then((response) => {
      function search(term) {
        return response.entries.filter((searchvalue) => searchvalue.name.includes(term));
      }
      this.res = search(this.searchKeyword)
      this.res.forEach((val) => {
        if (val.path_lower.endsWith("jpg") || val.path_lower.endsWith("png")) {
          this.dataService.getImages(val.path_lower)
            .then((imgResp) => {
              val.thumb_image = URL.createObjectURL(imgResp.fileBlob);
              this.dataService.stream.next(this.res);
          });
        }
      });
      this.dataService.stream.next(this.res);
    })
    .catch(function(error) {
      console.error(error);
  });
    return this.dataService.stream;
  }
}