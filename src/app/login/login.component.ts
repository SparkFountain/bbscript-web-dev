import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  action: string;

  userOrEmail: string;
  password: string;
  notices: object;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.action = 'login';

    this.userOrEmail = '';
    this.password = '';

    this.notices = {};
  }

  ngOnInit(): void {}

  login() {
    this.userOrEmail = this.userOrEmail.trim();
    this.notices = {};

    if (this.userOrEmail.length < 2) {
      this.notices['username-too-short'] = true;
    } else if (this.userOrEmail.length > 32) {
      this.notices['username-too-long'] = true;
    } else if (!environment.usernameRegex.test(this.userOrEmail) && !environment.emailRegex.test(this.userOrEmail)) {
      this.notices['input-invalid'] = true;
    }

    if (this.password.length < 8) {
      this.notices['password-too-short'] = true;
    }

    // console.info('[NOTICES]', this.notices);

    if (Object.keys(this.notices).length === 0) {
      this.authService.login(this.userOrEmail, this.password).then(() => this.router.navigateByUrl('/'));
    }
  }
}
