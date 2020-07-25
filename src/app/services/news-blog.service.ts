import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsBlogService {
  constructor(private translateService: TranslateService, private http: HttpClient) {}

  public getTotalPages(): Promise<number> {
    return this.http
      .get(`${environment.apiServer}/news/total-pages`)
      .toPromise()
      .then((response: ApiResponse<number>) => response.data);
  }

  public get(page: number): Promise<News[]> {
    return this.http
      .get(`${environment.apiServer}/news`, {
        params: {
          page: page.toString(),
          language: this.translateService.currentLang
        }
      })
      .toPromise()
      .then((response: ApiResponse<News[]>) => response.data);
  }
}
