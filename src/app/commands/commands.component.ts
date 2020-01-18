import { Component, ViewChild, OnInit } from '@angular/core';
import { Command } from '../interfaces/command.interface';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'bbscript/src/services/language/language.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  public objectKeys = Object.keys;

  public categories: object;
  public loadedCategories: boolean;
  public commands: any;
  public activeCat: string;
  public activeSubCat: string;

  public searchTerm: string;

  private searchResult: {
    commands: Command[];
  };

  public testCode: string;

  @ViewChild('searchInput', { static: false }) searchInput: any;

  constructor(private translate: TranslateService,
    private languageService: LanguageService,
    private http: HttpClient
  ) {
    this.activeCat = 'graphics2d';
    this.activeSubCat = 'pixel';

    this.loadedCategories = false;

    this.searchTerm = '';

    this.searchResult = {
      commands: []
    };

    this.testCode = 'Rect 10, 10, 100, 50';
  }

  ngOnInit() {
    this.http.get('/assets/command-categories.json').subscribe((categories) => {
      this.categories = categories;
      this.loadedCategories = true;
    });
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
