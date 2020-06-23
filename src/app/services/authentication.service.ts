import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public token: BehaviorSubject<string>;
  public userOrEmail: string;

  constructor(private http: HttpClient, public translate: TranslateService) {
    this.token = new BehaviorSubject<string>('');
  }

  register$(username: string, email: string, password: string, termsAccepted: boolean) {
    return this.http.post<ApiResponse>(`${environment.apiServer}/register`, {
      username,
      email,
      password,
      termsAccepted,
      language: this.translate.currentLang
    });
  }

  login$(userOrEmail: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiServer}/login`, {
      userOrEmail,
      password,
    });
  }

  logout$() {
    return this.http
      .post<ApiResponse>(`${environment.apiServer}/logout`, {
        userOrEmail: this.userOrEmail,
        token: this.token.value,
      })
      .pipe(
        map(() => {
          this.token.next('');
          this.userOrEmail = '';
        })
      );
  }

  usernameExists$(username: string) {
    return this.http.get<ApiResponse>(
      `${environment.apiServer}/username-exists`,
      {
        params: {
          username,
        },
      }
    );
  }

  emailExists$(email: string) {
    return this.http.get<ApiResponse>(`${environment.apiServer}/email-exists`, {
      params: {
        email,
      },
    });
  }

  updateToken(token: string) {
    this.token.next(token);
  }
}
