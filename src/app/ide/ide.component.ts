import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  @Input() buttons: string[];

  public settingsOpen: boolean;

  constructor() {
    this.settingsOpen = false;
  }

  ngOnInit(): void {}

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
}
