import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Command } from '../interfaces/command.interface';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'bbscript/src/services/language/language.service';
import { HttpClient } from '@angular/common/http';

import { AceDirective } from 'ngx-ace-wrapper';
import { AceConfig } from '../interfaces/ace-config.interface';
import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
import 'brace/theme/cobalt';
import 'brace/theme/terminal';
import '../../assets/ace/mode-bbscript';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit, AfterViewInit {
  public objectKeys = Object.keys;

  public categories: object;
  public loadedCategories: boolean;
  public commands: any;

  public activeCat: string;
  public activeSubCat: string;
  public activeCommand: string;

  public searchTerm: string;

  private searchResult: {
    commands: Command[];
  };

  public commandCode: string;

  public section: 'editor' | 'game';

  @ViewChild('searchInput', { static: false }) searchInput: any;
  @ViewChild(AceDirective, { static: false }) directiveRef?: AceDirective;

  public ace: AceConfig;

  constructor(private translate: TranslateService,
    private languageService: LanguageService,
    private http: HttpClient
  ) {
    this.activeCat = '';
    this.activeSubCat = '';
    this.activeCommand = '';

    this.loadedCategories = false;

    this.searchTerm = '';

    this.searchResult = {
      commands: []
    };

    this.ace = {
      instance: null,
      config: {
        mode: 'bbscript',
        theme: 'terminal',
        wrap: true,
        readOnly: false
      },
      code: ''
    };

    this.section = 'editor';
  }

  ngOnInit() {
    this.http.get('/assets/command-categories.json').subscribe((categories) => {
      this.categories = categories;
      this.loadedCategories = true;
    });
  }

  ngAfterViewInit(): void {
    this.ace.instance = this.directiveRef.ace();
  }

  firstUpperCase(command: string) {
    if (command.length === 0) {
      return command;
    }
    return `${command[0].toUpperCase()}${command.substr(1)}`;
  }

  firstSentence(text: string) {
    return text.split('.')[0];
  }

  selectCategory(category: string) {
    this.activeCat = category;
  }

  selectSubCategory(subCategory: string) {
    this.activeSubCat = subCategory;
  }

  selectCommand(command: string) {
    this.activeCommand = command;

    this.ace.instance.setValue(this.categories[this.activeCat][this.activeSubCat][this.activeCommand].code);
  }

  play() {
    this.section = 'game';
    this.commandCode = this.ace.instance.getValue().split('\n');
  }

  stop() {
    this.section = 'editor';
    this.commandCode = '';
  }

  i18nCommand(command: string) {
    let result: string = command[0].toUpperCase();

    for (let i = 1; i < command.length; i++) {
      const char: string = command[i];
      if (char === char.toUpperCase()) {
        result += `_${char}`;
      } else {
        result += char.toUpperCase();
      }
    }

    return result;
  }

  updateSearch() {
    if (this.searchTerm.length >= 3) {
      console.info('[SEARCH TERM]', this.searchTerm);

      // reset search result
      this.searchResult.commands = [];

      // search in commands
      // this.commands.forEach((command: Command) => {
      //   if (command.name.indexOf(this.searchTerm) > -1) {
      //     this.searchResult.commands.push(command);
      //   }
      // });
    }
  }
}
