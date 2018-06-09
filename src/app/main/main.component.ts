import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HandleloadService } from '../handleload.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showUpLoadDiv = false;

  constructor(private authService: AuthService, private handleLoadService: HandleloadService) { }

  ngOnInit() {
  }

  makeUploadVisible() {
    this.showUpLoadDiv = true;
  }

  closeUploadDiv() {
    this.showUpLoadDiv = false;
  }

  upLoadFile(event) {
    this.handleLoadService.upLoadFile(event);
  }

  logout() {
    this.authService.logout();
  }
}
