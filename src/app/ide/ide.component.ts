import { Component, OnInit } from '@angular/core';

export interface FileOrFolder {
  icon: string;
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
    png: 'file-image-o'
  };

  public filesAndFolders: FileOrFolder[];

  constructor() {
    this.projectName = 'Snake';

    this.filesAndFolders = [];
  }

  ngOnInit(): void {}
}
