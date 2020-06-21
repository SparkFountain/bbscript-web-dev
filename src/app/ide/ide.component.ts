import { Component, OnInit } from '@angular/core';

export interface FileOrFolder {
  type: 'image' | 'sound' | 'folder' | 'bbscript' | 'other';
  name: string;
}

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  public projectName: string;

  public icons = {
    image: 'file-image-o',
    sound: 'file-audio-o',
    folder: 'folder-open-o',
    bbscript: 'file-text-o',
    other: 'file-o'
  };

  public filesAndFolders: FileOrFolder[];

  public settingsOpen: boolean;

  constructor() {
    this.projectName = 'Snake';

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

    this.settingsOpen = false;
  }

  ngOnInit(): void {}

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }
}
