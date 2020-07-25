import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project';
import { LetsCodeService } from 'src/app/services/lets-code.service';
import { Template } from 'src/app/interfaces/template';

@Component({
  selector: 'app-empty-project',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  templates: Template[];

  constructor(private letsCodeService: LetsCodeService) {}

  ngOnInit(): void {
    this.letsCodeService.getTemplates().then((templates: Template[]) => {
      this.templates = templates;
      console.info('[TEMPLATES]', this.templates);
    });
  }
}
