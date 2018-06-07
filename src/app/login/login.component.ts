import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.url.subscribe(() => {
      const responsUrl = this.router.url;
      if(responsUrl.indexOf('&') !== -1) {
      const params = responsUrl.split('&')
      console.error('token now', params);
      const authToken = params[0].split('=');
      console.error('token now', authToken);
      const myToken = authToken[1]
      console.error('mytoken ', myToken)

      localStorage.setItem('token', myToken);
      this.router.navigate(['/home'])

      } else { this.router.navigate(['/login']) }
    })
  }

  login() {
    const authURL = "https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=nyfmqnlf5r5ndgz&redirect_uri=http://localhost:4200/login";
    return window.location.href = authURL;
  }

}

