import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';

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

    console.info('[NOTICES]', this.notices);

    if (Object.keys(this.notices).length === 0) {
      this.authService.login$(this.userOrEmail, this.password).subscribe((response: ApiResponse<any>) => {
        if (response.status === 'success') {
          console.info('[REGISTRATION SUCCESSFUL]', response);
          this.authService.userOrEmail = this.userOrEmail;
          this.authService.updateToken(response.data.token);
          this.router.navigateByUrl('/');
        } else {
          console.info('[REGISTRATION FAILED]', response);
          this.notices[response.message] = true;
        }
      });
    }
  }
}
