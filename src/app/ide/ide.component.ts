import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  @Input() buttons: string[];
  @Input() code: string[];

  public settingsOpen: boolean;
  public codeLines: any[];
  public caret: { x: number; y: number };

  constructor() {
    this.settingsOpen = false;
    this.caret = { x: 0, y: 0 };
  }

  ngOnInit(): void {
    this.code = [
      'Graphics 640, 480, 0, 1',
      'Rect 0, 0, 640, 480',
      'Bild = LoadImage ("Tiles.JPG")',
      'MaskImage Bild, 255, 0, 0',
      'DrawImage Bild, 100, 100'
    ];

    this.codeLines = this.code;
  }

  play(): void {
    console.warn('[PLAY] Not implemented yet');
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
