import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { Code } from '../interfaces/ide/code';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  @Input() buttons: string[];
  @Input('code') initialCode: string[];

  @ViewChild('codingArea', { static: false }) codingArea: HTMLDivElement;

  public settingsOpen: boolean;
  public caret: { x: number; y: number; top: number; left: number };

  public code: Code;

  public playing: boolean;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.info('[KEY DOWN]', event);

    const previousLine = this.code.plain[this.caret.y - 1];
    let currentLine = this.code.plain[this.caret.y];
    const nextLine = this.code.plain[this.caret.y + 1];

    let updateCurrentLine = true;

    switch (event.code) {
      case 'Backspace':
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
        } else {
          if (this.caret.y > 0) {
            this.code.plain.splice(this.caret.y, 1);
            this.caret.y--;
            this.caret.x = this.code.plain[this.caret.y].length - 1;
          }

          updateCurrentLine = false;
        }
        break;
      case 'Enter':
      case 'NumpadEnter':
        this.caret.x = 0;
        this.caret.y++;
        this.code.plain.splice(this.caret.y, 0, '');
        updateCurrentLine = false;
        break;
      case 'Space':
        event.preventDefault();
        currentLine += ' ';
        break;
      default:
        if (event.key.length === 1) {
          currentLine += event.key;
        }
    }

    if (updateCurrentLine) {
      this.code.plain[this.caret.y] = currentLine;
    }
  }

  constructor() {
    this.settingsOpen = false;
    this.caret = { x: 0, y: 0, top: 0, left: 0 };
  }

  ngOnInit(): void {
    this.initialCode = [''];

    this.code = {
      plain: this.initialCode,
      formatted: this.initialCode
    };

    this.playing = false;
  }

  play(): void {
    console.warn('[PLAY] Not implemented yet');
    this.playing = true;
  }

  stop(): void {
    this.playing = false;
  }

  debug(): void {
    console.warn('[DEBUG] Not implemented yet');
  }

  undo(): void {
    console.warn('[UNDO] Not implemented yet');
  }

  redo(): void {
    console.warn('[REDO] Not implemented yet');
  }

  guide(): void {
    console.warn('[CODING GUIDE] Not implemented yet');
  }

  codeCleanUp(): void {
    console.warn('[CODE CLEAN UP] Not implemented yet');
  }

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  syntaxHighlighting(): any {}
}
