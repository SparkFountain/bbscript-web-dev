import { Component, OnInit } from '@angular/core';

export interface FileOrFolder {
  type: 'image' | 'sound' | 'folder' | 'bbscript' | 'other';
  name: string;
}

@Component({
  selector: 'app-lets-code',
  templateUrl: './lets-code.component.html',
  styleUrls: ['./lets-code.component.scss']
})
export class LetsCodeComponent implements OnInit {
  public projectName: string;
  public searchTerm: string;

  public icons = {
    image: 'file-image-o',
    sound: 'file-audio-o',
    folder: 'folder-open-o',
    bbscript: 'file-text-o',
    other: 'file-o'
  };

  public filesAndFolders: FileOrFolder[];

  public showFiles: boolean;

  constructor() {
    this.projectName = 'Snake';
    this.searchTerm = 'abc test 123';

    this.filesAndFolders = [
      {
        type: 'folder',
        name: 'Music'
      },
      {
        type: 'bbscript',
        name: 'Game.bb'
      }
    ];

    this.showFiles = true;
  }

  ngOnInit(): void {}

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
}
