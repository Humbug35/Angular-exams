import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
searchkeyWord = '';
  constructor(private search: SearchService) { 
    this.search.searchKeyword = this.searchkeyWord;
  }
  ngOnInit() {}
}
