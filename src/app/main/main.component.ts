import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HandleloadService } from '../handleload.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Stream } from 'stream';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private handleLoadService: HandleloadService) { }
  ngOnInit() {}

  upLoadFile(event) {
      this.handleLoadService.upLoadFile(event);
  }
  logout() {
      this.authService.logout();
  }
}
