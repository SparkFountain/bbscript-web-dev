import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { ApiService } from 'bbscript/src/services/api.service';
import { TranslateService } from '@ngx-translate/core';

export interface DocCategory {
  title: string;
  elements: any;
}

export interface Category {
  title: string;
  icon: string;
  path: string;
}

export interface Breadcrumb {
  title: string;
  path: string;
}

export interface NavElement {
  title: string;
  path: string;
}

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];
  public navElements: NavElement[];
  public searchTerm: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.breadcrumbs = [];
    this.navElements = [];
    this.searchTerm = '';

    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    // console.info('[SNAPSHOT ROUTE]', snapshot);

    const navParams: { language: string; level1?: string; level2?: string; level3?: string; level4?: string } = {
      language: this.translate.currentLang
    };
    for (let i = 0; i <= 3; i++) {
      if (snapshot.url[i]) {
        navParams[`level${i + 1}`] = snapshot.url[i].path;
      }
    }

    // console.info('[NAV PARAMS]', navParams);

    this.http
      .get(`${environment.apiServer}/docs/breadcrumbs`, { params: navParams })
      .toPromise()
      .then((response: ApiResponse<Breadcrumb[]>) => {
        this.breadcrumbs = response.data;
        // console.info('[BREADCRUMBS]', this.breadcrumbs);
      })
      .then(() => this.http.get(`${environment.apiServer}/docs/navigation`, { params: navParams }).toPromise())
      .then((response: ApiResponse<NavElement[]>) => {
        this.navElements = response.data;
        // console.info('[NAVIGATION ELEMENTS]', this.navElements);
      });
  }

  ngOnInit(): void {}

  navigateTo(path: string): void {
    this.router.navigateByUrl(`/dokumentation/${path}`);
  }

  search(): void {
    this.http
      .get(`${environment.apiServer}/docs/search`, { params: { term: this.searchTerm } })
      .toPromise()
      .then((response: ApiResponse<any[]>) => {
        console.info('[SEARCH RESPONSE]', response);
      });
  }

  isSection(section: string): boolean {
    if (section === '') {
      return !this.route?.snapshot?.url[0];
    } else {
      return this.route?.snapshot?.url[0]?.path === section;
    }
  }
}
