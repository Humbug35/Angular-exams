import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BreadcrumbService } from '../breadcrumb.service';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  breadCrumbs = [];
  items = this.dataService.items;
  url = this.router.url;

  constructor(private authService: AuthService,
              private bc: BreadcrumbService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(() => {
      this.bc.listBreadCrumb(this.router.url);
    });

    this.bc.listBreadCrumb(this.breadCrumbs);
    this.bc.stream.subscribe((breadCrumbs: any) => {
      this.breadCrumbs = breadCrumbs;

      console.log('breadcrumbs maincomp',this.breadCrumbs);
    });
  }

  /*goBack(clickedItem) {
    console.log('clickedItem: ', clickedItem);
    this.bc.goBack(clickedItem, this.items);
  }*/


  logout() {
    this.authService.logout();
  }

}
