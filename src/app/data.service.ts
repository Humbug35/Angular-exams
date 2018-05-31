import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }

  username: string;
  password: string;
  token: string;


}
