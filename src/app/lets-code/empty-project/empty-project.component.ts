import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-empty-project',
  templateUrl: './empty-project.component.html',
  styleUrls: ['./empty-project.component.scss']
})
export class EmptyProjectComponent implements OnInit {
  project: Project;
  uploadImageFile: any[];

  constructor() {}

  ngOnInit(): void {
    this.project = {
      title: '',
      description: '',
      license: 'CC0',
      imageUrl: ''
    };
  }

  onFileChange(event: any) {
    this.uploadImageFile = event.target.files;
    console.log('[Upload Image File]', event);
  }
}
