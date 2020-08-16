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

  getKeywords(): Promise<string[]> {
    return this.http
      .get(`${environment.apiServer}/keywords`)
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }

  getCommands(): Promise<string[]> {
    return this.http
      .get(`${environment.apiServer}/commands`)
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }

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

  getSharedFiles(): Promise<any> {
    return this.http
      .get(`${environment.apiServer}/shared-files`)
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }

  getFileContent(path: string): Promise<any> {
    return this.http
      .get(`${environment.apiServer}/shared-files/get-content`, { params: { path } })
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }
}
