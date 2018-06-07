import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import {observable} from "rxjs/index";

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css']
})
export class ItemComponentComponent implements OnInit {
  items = [];


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
              ) {  }


  ngOnInit() {
    this.route.url.subscribe(() => {
      this.dataService.getItems(decodeURI(this.router.url));
    });
    this.dataService.stream.subscribe((items: any) => {
      console.error('items ', items);
      this.items = items;
      console.error('user items ', this.items);
    });
    this.dataService.getItems('/home');
  }
  folderImage() {
    if(this.items[".tag"] === 'folder') {
      return  `<i class="fas fa-folder icon-semi-size"></i>`;
    } else { `img` }
  }
}
