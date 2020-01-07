import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandsBasicsService } from 'bbscript/src/services/commands/basics.service';
import { Observable } from 'rxjs';
import { KeyWord } from '../interfaces/key-word.interface';
import { Command } from '../interfaces/command.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent {
  private userLanguage: string;

  private keywords: KeyWord[];
  private commands: Command[];

  public searchTerm: string;

  private searchResult: {
    keywords: KeyWord[],
    commands: Command[]
  };

  private categories: any;

  @ViewChild('searchInput', { static: false }) searchInput: any;

  constructor(private translate: TranslateService
  ) {
    this.userLanguage = this.translate.currentLang;

    this.keywords = [];
    this.commands = [];

    this.searchTerm = '';

    this.searchResult = {
      keywords: [],
      commands: []
    };
  }

  updateSearch() {
    if (this.searchTerm.length >= 3) {
      console.info('[SEARCH TERM]', this.searchTerm);

      // reset search result
      this.searchResult.keywords = [];
      this.searchResult.commands = [];

      // search in keywords
      this.keywords.forEach((keyword: KeyWord) => {
        if (keyword.name.indexOf(this.searchTerm) > -1) {
          this.searchResult.keywords.push(keyword);
        }
      });

      // search in commands
      this.commands.forEach((command: Command) => {
        if (command.name.indexOf(this.searchTerm) > -1) {
          this.searchResult.commands.push(command);
        }
      });
    }
  }

}
