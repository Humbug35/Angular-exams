import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css']
})
export class ItemComponentComponent implements OnInit {
  mockedItems = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.stream.subscribe((items: any) => {
      this.mockedItems = items;
      console.log('MainComp', this.mockedItems);
    });
    this.authService.getMockedItems('/home');
    console.log('NgonInit', this.mockedItems);
  }

}
