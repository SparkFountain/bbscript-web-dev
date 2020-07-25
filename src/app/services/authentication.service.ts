import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token: BehaviorSubject<string>;
  public user: User;

  constructor(private http: HttpClient, public translate: TranslateService) {
    this.token = new BehaviorSubject<string>('');
  }

  register(username: string, email: string, password: string, termsAccepted: boolean): Promise<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('email', email)
      .set('password', password)
      .set('termsAccepted', termsAccepted.toString())
      .set('language', this.translate.currentLang);

    return this.http.post<ApiResponse<any>>(`${environment.apiServer}/auth/register`, body).toPromise();
  }

  login(userOrEmail: string, password: string): Promise<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${environment.apiServer}/auth/login`, {
        userOrEmail,
        password
      })
      .toPromise();
  }

  logout(): Promise<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${environment.apiServer}/auth/logout`, {
        userOrEmail: this.user.email,
        token: this.token.value
      })
      .toPromise();
  }

  usernameExists(username: string): Promise<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(`${environment.apiServer}/auth/username-exists`, {
        params: {
          username
        }
      })
      .toPromise();
  }

  emailExists(email: string) {
    return this.http
      .get<ApiResponse<any>>(`${environment.apiServer}/auth/email-exists`, {
        params: {
          email
        }
      })
      .toPromise();
  }

  checkCredentials(): Promise<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.apiServer}/auth/check-credentials`, {}).toPromise();
  }

  updateToken(token: string): void {
    this.token.next(token);
  }
}
