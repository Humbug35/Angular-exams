import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchWord = 'Cam';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService : DataService) { }

  ngOnInit() {
  }
  serachItem(path): Observable<any> {
    if (path === "/") { path = ""; }
    this.dataService.dbx.filesListFolder({path: path})
    .then((response) => {
      function search(term) {
        return response.entries.filter((searchvalue) => searchvalue.name.includes(term));
      }
      console.error('search string', this.searchWord)
      console.error('search result', search(this.searchWord))
      //this.dataService.stream.next(search('Cam'));
    })
    .catch(function(error) {
      console.error(error);
  });
    return this.dataService.stream;
  }

  startSearch() {
    this.activatedRoute.url.subscribe(() => {
      this.serachItem(decodeURI(this.router.url))
    });
    this.dataService.stream.subscribe((items: any) => {
      this.dataService.items = items;
    });
  }
}
