import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
  logout() {
    this.authService.logout();
  }
}
