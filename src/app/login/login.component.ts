import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInput = {
    username: '',
    password: ''
  };
  failedLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    const authURL = "https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=nyfmqnlf5r5ndgz&redirect_uri=http://localhost:4200/home";
    return window.location.href = authURL;
  }

  /*logout() {
    this.authService.logout();
  }*/

}

