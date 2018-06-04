///<reference path="../../node_modules/rxjs/internal/Observable.d.ts"/>
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse,
  HttpHandler
} from '@angular/common/http';

import {Observable, of} from 'rxjs';




const username = 'kk@mail.se';
const password = 'kalas';

const entries = [{
  ".tag": "folder",
  "name": "jobb",
  "path_lower": "/jobb",
  "path_display": "/jobb",
  "id": "id:SXxm3pB30rMAAAAAAAAAxw"
}, {
  ".tag": "folder",
  "name": "funnyashell",
  "path_lower": "/funnyashell",
  "path_display": "/funnyashell",
  "id": "id:SXxm3pB30rMAAAAAAAAC_g"
}, {
  ".tag": "folder",
  "name": "lokalt",
  "path_lower": "/lokalt",
  "path_display": "/lokalt",
  "id": "id:SXxm3pB30rMAAAAAAAAC1Q"
}, {
  ".tag": "folder",
  "name": "programming",
  "path_lower": "/programming",
  "path_display": "/programming",
  "id": "id:SXxm3pB30rMAAAAAAAAEwA"
}, {
  ".tag": "folder",
  "name": "Sprak",
  "path_lower": "/sprak",
  "path_display": "/Sprak",
  "id": "id:SXxm3pB30rMAAAAAAAAEvw"
}
];

const token = '123';



/*const makeError = (status, error) => {
  return Observable.throw(
    new HttpErrorResponse({
      status,
      error
    })
  );
};*/

const makeResponse = body => {
  return of(
    new HttpResponse({
      status: 200,
      body
    })
  );
};

// ...
@Injectable()
export class Interceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const {
      body,       // object
      headers,    // object
      method,     // string
      url,        // string
    } = req;


    if(url === '/login') {
      if (body.username === username && body.password === password) {
        return makeResponse({
          token: token
        });
      }
      /*else {
             console.log('Error: ', makeError(401, {}));
             return makeError(401, {});
           }
         } else {
           makeError(500, {})
         }*/
    }
    if(url === '/home') {
      if(headers.has('Authorization')) {
        if(headers.get('Authorization') === `Bearer ${token}`) {
          console.log('MockedItems from Interceptor', entries);
          return makeResponse({
            entries
          })
        }
        /*else {
          return makeError(401, 'Unauthorized token')
        }*/

      }
      /*else {
        return makeError(400, 'No authorization token')
      }*/

    }
    /*else {
      return makeError(500, {})
    }*/

  }}
