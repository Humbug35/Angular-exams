import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import 'isomorphic-fetch';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  paths = []

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.activatedRoute.url.subscribe((path)=> {
      this.paths = this.getPaths()
    })
  }
  getPaths(){
    if(!this.router.url || this.router.url === '/'){ 
      return ['']
    }
    return this.router.url.split('/');
  }
    
  getPathName(url) {
    if(!url) return 'Home';
    return decodeURI(url);
  }
    
  getPath(path){
    const index = this.paths.indexOf(path);
    const a = this.paths.slice(0, index+1).reduce((a, b) =>  `${a}/${b}`, '');
    return decodeURI(a);
  }

}
