import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import { Code } from '../interfaces/ide/code';
import { LexerService } from 'bbscript/src/services/lexer.service';
import { LexerToken } from 'bbscript/src/interfaces/lexer-token';
import { ColorScheme } from '../types/color-scheme';
import { CaretPosition } from '../types/caret-position';
import { UndoRedoAction } from '../classes/ide/undo-redo-action';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeComponent implements OnInit, AfterViewChecked {
  @Input() buttons: string[];

  private _initialCode: string[];

  @Input('code') set initialCode(value: string[]) {
    this.code = {
      plain: value,
      formatted: [value]
    };
    this.syntaxHighlighting();
  }

  @ViewChild('codingArea', { static: false }) codingArea: ElementRef;

  public settingsOpen: boolean;
  public caret: { x: number; y: number; top: number; left: number };

  public code: Code;

  public colorScheme: ColorScheme;

  public playing: boolean;
  public action: 'idle' | 'play' | 'debug' | 'stop' | 'fake';

  public undoRedoStack: UndoRedoAction[];

  constructor(private lexer: LexerService, private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.settingsOpen = false;
    this.caret = { x: 0, y: 0, top: 0, left: 0 };

    this._initialCode = [''];

    this.code = {
      plain: this._initialCode,
      formatted: [this._initialCode] // TODO: refactor
    };

    this.colorScheme = 'solarized-light';

    this.playing = false;
    this.action = 'idle';
  }

  ngAfterViewChecked(): void {
    // this.updateCaretPosition();
    // this.changeDetection.markForCheck();
  }

  play(): void {
    this.playing = true;
    setTimeout(() => {
      this.action = 'fake';
      this.changeDetection.markForCheck();
    }, 0);
  }

  debug(): void {
    this.playing = true;
    setTimeout(() => {
      this.action = 'debug';
      this.changeDetection.markForCheck();
    }, 0);
  }

  stop(): void {
    this.playing = false;
  }

  undo(): void {
    console.warn('[UNDO] Unfinished implementation');

    if (this.undoRedoStack.length > 0) {
      const lastAction: UndoRedoAction = this.undoRedoStack.pop();
      // this.code.plain[lastAction.caret.begin.y] = '';
    }
  }

  redo(): void {
    console.warn('[UNDO] Unfinished implementation');

    if (this.undoRedoStack.length > 0) {
      const lastAction: UndoRedoAction = this.undoRedoStack.pop();
      // this.code.plain[lastAction.caret.begin.y] = '';
    }
  }

  guide(): void {
    console.warn('[CODING GUIDE] Not implemented yet');
  }

  /**
   * Cleanup Rules:
   * - correct indentation
   * - no unnecessary spaces
   * - no unnecessary new lines
   * - surround all commands with brackets (later and only optional)
   */
  codeCleanUp(): void {
    // correct indentation
  }

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  addCharacter(currentLine: string, character: string): string {
    if (character.length === 1) {
      this.caret.x++;
      return `${currentLine}${character}`;
    } else {
      return currentLine;
    }
  }

  insertCode(text: string): void {
    // TODO: this is just a basic paste implementation, not final!
    this.code.plain = text.split('\n');
    this.changeDetection.markForCheck();
    this.changeDetection.detectChanges();
  }

  moveCaret(direction: CaretPosition): void {
    switch (direction) {
      case 'up':
        break;
      case 'down':
        break;
      case 'left':
        if (this.caret.x > 0) {
          this.caret.x--;
        } else {
          if (this.caret.y > 0) {
            this.caret.y--;
            this.caret.x = this.code.plain[this.caret.y].length;
          }
          // TODO:
          // updateCurrentLine = false;
        }
        break;
      case 'right':
        break;
      case 'beginOfLine':
        this.caret.x = 0;
        break;
      case 'endOfLine':
        break;
    }
  }

  updateCaretPosition(): void {
    setTimeout(() => {
      this.caret.left = this.codingArea.nativeElement.offsetLeft + 88 + this.caret.x * 8.4;
      this.caret.top = this.codingArea.nativeElement.offsetTop + 15 + this.caret.y * 21;
    }, 0);
  }

  syntaxHighlighting(): void {
    this.code.formatted = [];

    const tokens: Array<LexerToken[]> = this.lexer.lexCode(this.code.plain);
    console.info('[TOKENS]', tokens);
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
