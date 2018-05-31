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
    this.authService.login(this.userInput).subscribe(() => {
      console.log('Login from logincomp.ts', this.userInput);
    }, (error) => {
      console.log('Failed to log in', error);
      this.failedLoggedIn = true;
    });
    this.userInput = {
      username: '',
      password: ''
    };
  }

  /*logout() {
    this.authService.logout();
  }*/

}

