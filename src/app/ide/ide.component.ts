import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Code } from '../interfaces/ide/code';
import { LexerService } from 'bbscript/src/services/lexer.service';
import { LexerToken } from 'bbscript/src/interfaces/lexer-token';
import { ColorScheme } from '../types/color-scheme';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  @Input() buttons: string[];
  @Input('code') initialCode: string[];

  @ViewChild('codingArea', { static: false }) codingArea: ElementRef;

  public settingsOpen: boolean;
  public caret: { x: number; y: number; top: number; left: number };

  public code: Code;

  public colorScheme: ColorScheme;

  public playing: boolean;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.info('[KEY DOWN]', event);

    const previousLine = this.code.plain[this.caret.y - 1];
    let currentLine = this.code.plain[this.caret.y];
    const nextLine = this.code.plain[this.caret.y + 1];

    let updateCurrentLine = true;

    switch (event.code) {
      case 'Backspace':
        if (this.caret.x > 0) {
          currentLine = currentLine.slice(0, -1);
          this.caret.x--;
        } else {
          if (this.caret.y > 0) {
            this.code.plain.splice(this.caret.y, 1);
            this.caret.y--;
            this.caret.x = this.code.plain[this.caret.y].length;
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
        this.caret.x++;
        break;
      case 'Home':
        this.caret.x = 0;
        break;
      case 'End':
        this.caret.x = this.code.plain[this.caret.y].length;
        break;
      case 'ArrowLeft':
        if (this.caret.x > 0) {
          this.caret.x--;
        } else {
          if (this.caret.y > 0) {
            this.caret.y--;
            this.caret.x = this.code.plain[this.caret.y].length;
          }
          updateCurrentLine = false;
        }
        break;
      default:
        if (event.key.length === 1) {
          currentLine += event.key;
          this.caret.x++;
        }
    }

    this.updateCaretPosition(); // TODO: just call in AfterViewInit
    if (updateCurrentLine) {
      this.code.plain[this.caret.y] = currentLine;
    }
    this.syntaxHighlighting();
  }

  constructor(private lexer: LexerService) {}

  ngOnInit(): void {
    this.settingsOpen = false;
    this.caret = { x: 0, y: 0, top: 0, left: 0 };

    this.initialCode = [''];

    this.code = {
      plain: this.initialCode,
      formatted: [this.initialCode] // TODO: refactor
    };

    this.colorScheme = 'solarized-light';

    this.playing = false;

    this.updateCaretPosition(); // TODO: does not work visually yet
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

  updateCaretPosition(): void {
    this.caret.left = this.codingArea.nativeElement.offsetLeft + 88 + this.caret.x * 8.4;
    this.caret.top = this.codingArea.nativeElement.offsetTop + 15 + this.caret.y * 21;
  }

  syntaxHighlighting(): void {
    this.code.formatted = [];

    const tokens: Array<LexerToken[]> = this.lexer.lexCode(this.code.plain);
    // console.info('[TOKENS]', tokens);
    tokens.forEach((line: LexerToken[]) => {
      const formattedLine: string[] = [];

      for (let i = 0; i < line.length; i++) {
        const currentToken: LexerToken = line[i];
        const nextToken: LexerToken = i < line.length - 1 ? line[i + 1] : null;

        formattedLine.push(
          `<span class="${this.key2Class(currentToken.which)}">${currentToken.value.toString()}</span>`
        );
        if (nextToken) {
          const spaceAmount = nextToken.offset.x - (currentToken.offset.x + currentToken.value.toString().length);
          if (spaceAmount > 0) {
            formattedLine.push(`<span>${'&nbsp;'.repeat(spaceAmount)}</span>`);
          }
        }
      }

      this.code.formatted.push(formattedLine);
    });

    console.info('[FORMATTED CODE]', this.code.formatted);
  }

  key2Class(key: string): string {
    if (key === 'BRACKET_OPEN' || key === 'BRACKET_CLOSE') {
      return 'bracket';
    }

    return key.toLowerCase().replace(/_/g, '-');
  }
}
