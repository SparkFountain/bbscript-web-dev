import { Injectable } from '@angular/core';
import { Template } from '../interfaces/template';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LetsCodeService {
  constructor(private http: HttpClient, private translateService: TranslateService) {}

  getTemplates(): Promise<Template[]> {
    return this.http
      .get(`${environment.apiServer}/coding/templates`, { params: { language: this.translateService.currentLang } })
      .toPromise()
      .then((response: ApiResponse<Template[]>) => response.data);
  }

  getFiles(path: string): Promise<any> {
    return this.http
      .get(`${environment.apiServer}/files`, { params: { path } })
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }
}
