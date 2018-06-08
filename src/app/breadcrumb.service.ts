import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import 'isomorphic-fetch';
import {ActivatedRoute, Data, Router} from '@angular/router';
//import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  stream = null;
  breadCrumbs = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.stream = new BehaviorSubject(this.breadCrumbs);
  }

  listBreadCrumb(path): Observable<any> {
    console.log('path param: ', path);
    if(path !== this.activatedRoute.url) {

    }
    this.activatedRoute.url.subscribe(() => {
    const currentCrumb = decodeURI(this.router.url);
    if(currentCrumb.indexOf('/') !== -1) {
    const crumbParams = currentCrumb.split('/');
    this.stream.next(crumbParams);
    console.log(crumbParams);
  }
});
    console.log('breadcrumb array', this.breadCrumbs);
return this.stream;
}
  /*goBack(myCrumb, myItems){
    console.log('myCrumb: ', myCrumb, 'myItems: ', myItems );
    for (let myItem of myItems ) {
      if (myCrumb === myItem.name) {
        this.breadCrumbs = myItem.path_lower;
      }
    }
  }*/
}

