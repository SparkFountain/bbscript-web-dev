import { Component, ViewChild } from '@angular/core';
import { Command } from '../interfaces/command.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent {
  public commands: any;
  public cmdCategoryIndex: number;
  public cmdScopeIndex: number;

  public searchTerm: string;

  public testCode: string;

  private searchResult: {
    commands: Command[];
  };

  @ViewChild('searchInput', { static: false }) searchInput: any;

  constructor(private translate: TranslateService) {
    this.cmdCategoryIndex = 0; // TODO: remove later
    this.cmdScopeIndex = 1; // TODO: remove later

    this.commands = [
      {
        title: '2d',
        scopes: [
          {
            title: 'display',
            commands: ['graphics']
          },
          {
            title: 'images',
            commands: [
              'autoMidHandle',
              'copyImage',
              'createImage',
              'drawBlock',
              'drawBlockRect',
              'drawImage',
              'drawImageRect',
              'freeImage',
              'grabImage',
              'handleImage',
              'imageBuffer',
              'imageHeight',
              'imageRectCollide',
              'imageRectOverlap',
              'imagesCollide',
              'imagesOverlap',
              'imageWidth',
              'imageXHandle',
              'imageYHandle',
              'loadAnimImage',
              'loadImage',
              'maskImage',
              'midHandle',
              'rectsOverlap',
              'resizeImage',
              'rotateImage',
              'saveImage',
              'scaleImage',
              'tFormFilter',
              'tFormImage',
              'tileBlock',
              'tileImage'
            ]
          },
          {
            title: 'graphics',
            commands: [
              'availVidMem',
              'backBuffer',
              'cls',
              'clsColor',
              'color',
              'copyRect',
              'flip',
              'flip',
              'line',
              'loadBuffer',
              'origin',
              'oval',
              'rect',
              'saveBuffer'
            ]
          }
        ]
      },
      {
        title: '3d'
      },
      {
        title: 'io'
      },
      {
        title: 'basics'
      },
      {
        title: 'sound'
      },
      {
        title: 'gui'
      },
      {
        title: 'data'
      }
    ];

    this.searchTerm = '';

    this.searchResult = {
      commands: []
    };

    this.testCode = 'Rect 0, 0, 100, 100';
  }

  firstUpperCase(command: string) {
    if (command.length === 0) {
      return command;
    }
    return `${command[0].toUpperCase()}${command.substr(1)}`;
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
      this.commands.forEach((command: Command) => {
        if (command.name.indexOf(this.searchTerm) > -1) {
          this.searchResult.commands.push(command);
        }
      });
    }
  }
}
