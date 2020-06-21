import { Component, OnInit } from '@angular/core';

export interface DocCategory {
  title: string;
  elements: any;
}

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  public activeCategory: string;
  public activeSubCategory: string;

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

  constructor() {
    this.activeCategory = '';
    this.activeSubCategory = '';
  }

  ngOnInit(): void {}

  toggleCategory(category: string): void {
    if (this.activeCategory === category) {
      this.activeCategory = '';
    } else {
      this.activeCategory = category;
    }
  }
}
