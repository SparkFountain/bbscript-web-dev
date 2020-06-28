import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

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
  public activeCategory: Category;
  public activeSubCategory: Category;

  public categories: Category[] = [
    { title: 'KEYWORDS', icon: 'key', path: 'schluesselwoerter' },
    { title: 'COMMANDS', icon: 'book', path: 'befehle' },
    { title: 'CONSTANTS_AND_SCANCODES', icon: 'list-ol', path: 'konstanten-und-scancodes' },
    { title: 'DIFFERENCES_TO_BLITZBASIC', icon: 'exchange', path: 'unterschiede-zu-blitz-basic' }
  ];

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

  constructor(private route: ActivatedRoute, private router: Router) {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    if (snapshot.url.length === 1) {
      this.activeCategory = null;
      this.activeSubCategory = null;
    } else {
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
  }

  ngOnInit(): void {}

  navigateTo(path: string): void {
    this.router.navigateByUrl(`/dokumentation/${path}`);
  }
}
