import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute, private router: Router, private dataService : DataService) { }

  ngOnInit() {
  }

  startSearch() {
    this.activatedRoute.url.subscribe(() => {
      this.searchService.serachItem(decodeURI(this.router.url))
    });
    this.dataService.stream.subscribe((items: any) => {
      this.dataService.items = items;
    });
  }
}
