import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.url.subscribe(() => {
      const responsUrl = this.router.url;
      if(responsUrl.indexOf('&') !== -1) {
      const params = responsUrl.split('&');
      const authToken = params[0].split('=');
      const myToken = authToken[1];

      localStorage.setItem('token', myToken);
        if (localStorage.getItem('token') === 'The+user+chose+not+to+give+your+app+access+to+their+Dropbox+account.') {
          localStorage.removeItem('token');
        }
      this.router.navigate([''])

      } else { this.router.navigate(['/login']) }
    });
  }

  login() {
    const authURL = "https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=nyfmqnlf5r5ndgz&redirect_uri=http://localhost:4200/login";
    return window.location.href = authURL;
  }

}

