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

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  public breadcrumbs: string[];

  public activeCategory: Category;
  public activeSubCategory: Category;

  public categories: Category[];

  public keywordCategories: DocCategory[] = [
    {
      title: 'VARIABLES',
      elements: ['global', 'local', 'const']
    },
    {
      title: 'CONDITIONS',
      elements: ['if', 'then', 'elseif', 'else', 'endif', 'select', 'case', 'default']
    },
    {
      title: 'ARRAYS',
      elements: ['dim']
    },
    {
      title: 'LOOPS',
      elements: ['for', 'to', 'step', 'next', 'while', 'wend', 'repeat', 'until', 'forever', 'each', 'mainloop', 'exit']
    },
    {
      title: 'FUNCTIONS',
      elements: ['function', 'return']
    },
    {
      title: 'TYPES',
      elements: [
        'type',
        'field',
        'before',
        'after',
        'delete',
        'first',
        'insert',
        'last',
        'new',
        'null',
        'object',
        'handle'
      ]
    },
    {
      title: 'LOGIC',
      elements: ['and', 'or', 'xor', 'not', 'mod', 'false', 'true', 'pi', 'sar', 'shl', 'shr']
    },
    {
      title: 'DIVERSE',
      elements: ['end', 'include', 'stop', 'data', 'restore', 'read']
    }
  ];

  public commandCategories: DocCategory[] = [
    {
      title: 'BASICS',
      elements: []
    },
    {
      title: 'DATA',
      elements: []
    },
    {
      title: 'GRAPHICS_2D',
      elements: []
    },
    {
      title: 'GRAPHICS_3D',
      elements: []
    },
    /* {
      title: 'NETWORK',
      elements: []
    }, */
    {
      title: 'IO',
      elements: []
    },
    {
      title: 'SOUND',
      elements: []
    },
    {
      title: 'GUI',
      elements: []
    }
  ];

  public constantsAndScancodes: any = [];

  public differencesToBlitzBasic: any = [];

  public migrationGuideCategories: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const breadcrumbParams: { language: string; level1?: string; level2?: string; level3?: string; level4?: string } = {
      language: this.translate.currentLang
    };
    for (let i = 1; i <= 4; i++) {
      if (snapshot.url[i]) {
        breadcrumbParams[`level${i}`] = snapshot.url[i].path;
      }
    }
    console.info('Breadcrumb Parameters:', breadcrumbParams);

    this.http
      .get(`${environment.apiServer}/docs/breadcrumbs`, { params: breadcrumbParams })
      .toPromise()
      .then((response: ApiResponse<string[]>) => {
        this.breadcrumbs = response.data;
        console.info('[BREADCRUMBS]', this.breadcrumbs);
      });

    this.http
      .get(`${environment.apiServer}/docs/categories`)
      .toPromise()
      .then((response: ApiResponse<Category[]>) => {
        this.categories = response.data;

        const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
        if (snapshot.url.length === 1) {
          this.activeCategory = null;
          this.activeSubCategory = null;
        } else {
          // TODO: refactor (deprecated)
          switch (snapshot.url[1].path) {
            case 'keywords':
            case 'schluesselwoerter':
              this.activeCategory = this.categories[0];
              break;
            case 'commands':
            case 'befehle':
              this.activeCategory = this.categories[1];
              break;
            case 'constants-and-scancodes':
            case 'konstanten-und-scancodes':
              this.activeCategory = this.categories[2];
              break;
            case 'differences-to-blitz-basic':
            case 'unterschiede-zu-blitz-basics':
              this.activeCategory = this.categories[3];
              break;
          }
        }
      });
  }

  ngOnInit(): void {}

  navigateTo(path: string): void {
    this.router.navigateByUrl(`/dokumentation/${path}`);
  }
}
