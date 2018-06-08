import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import {observable} from "rxjs/index";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css']
})
export class ItemComponentComponent implements OnInit {
items = [];
constructor( private dataService: DataService, private route: ActivatedRoute, private router: Router, private domSanitizer: DomSanitizer) {}

ngOnInit() {
    this.route.url.subscribe(() => {
      this.dataService.getItems(decodeURI(this.router.url));
    });
    this.dataService.stream.subscribe((items: any) => {
      console.error('items ', items);
      this.items = items;
      console.error('user items ', this.items);
    });
 }
 formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }
 sanitizer(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
 }
}
