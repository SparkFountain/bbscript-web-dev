import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DocCache } from '../interfaces/cache/documentation-cache';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  public cache: DocCache[];

  constructor(private http: HttpClient) {
    this.cache = [];
  }

  public get(route: string, params?: object): Promise<any> {
    const docCache: DocCache = this.cache.find(
      obj => obj.route === route && JSON.stringify(obj.params) === JSON.stringify(params)
    );

    if (docCache) {
      return Promise.resolve(docCache.data);
    } else {
      return this.http
        .get(`${environment.apiServer}/docs/${route}`, {
          params: { ...params }
        })
        .toPromise()
        .then((response: ApiResponse<any>) => {
          console.info('[API RESPONSE]', response);
          this.cache.push({
            route,
            params,
            data: response.data
          });
          return response.data;
        });
    }
  }
}
