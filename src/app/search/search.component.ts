import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyWord = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService : DataService, private search: SearchService) { }

  ngOnInit() {
  }

  startSearch() {
    this.activatedRoute.url.subscribe(() => {
      this.search.searchItem(decodeURI(this.router.url))
    });
    this.dataService.stream.subscribe((items: any) => {
      this.dataService.items = items;
    });
  }
  submitSearch() {
    return this.search.catchSearchKey(this.keyWord);
  }
}
