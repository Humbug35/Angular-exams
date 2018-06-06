import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    //private location: Location
              ) {  }


  ngOnInit() {
    this.dataService.stream.subscribe((items: any) => {
      this.items = items;
      console.log('Itemcomponent', this.items);
    });
    this.dataService.getItems('/home');
    console.log('NgonInit', this.items);
  }
 /* getSubDirectory() {
    this.dataService.getItems(this)
  }*/
}
