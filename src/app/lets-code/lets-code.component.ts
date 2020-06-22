import { Component, OnInit } from '@angular/core';

export interface FileOrFolder {
  type: 'image' | 'sound' | 'folder' | 'bbscript' | 'other';
  name: string;
}

@Component({
  selector: 'app-ide',
  templateUrl: './lets-code.component.html',
  styleUrls: ['./lets-code.component.scss'],
})
export class LetsCodeComponent implements OnInit {
  public projectName: string;
  public searchTerm: string;

  public icons = {
    image: 'file-image-o',
    sound: 'file-audio-o',
    folder: 'folder-open-o',
    bbscript: 'file-text-o',
    other: 'file-o',
  };

  public filesAndFolders: FileOrFolder[];

  public settingsOpen: boolean;
  public showFiles: boolean;

  constructor() {
    this.projectName = 'Snake';
    this.searchTerm = 'abc test 123';

    this.filesAndFolders = [
      {
        type: 'folder',
        name: 'Music',
      },
      {
        type: 'bbscript',
        name: 'Game.bb',
      },
    ];

    this.settingsOpen = false;
    this.showFiles = true;
  }

  ngOnInit(): void {}

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  search(): void {
    console.warn('[SEARCH] Not implemented yet');

    this.searchTerm = this.searchTerm.trim();
    if (this.searchTerm.length < 2) {
      return;
    }
  }

  createFile(): void {
    console.warn('[CREATE FILE] Not implemented yet');
  }

  openProject(): void {}

  toggleFiles(): void {
    this.showFiles = !this.showFiles;
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
}
