import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AceDirective } from 'ngx-ace-wrapper';
import { AceConfig } from '../interfaces/ace-config.interface';

import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
import 'brace/theme/cobalt';
import 'brace/theme/terminal';
import '../../assets/ace/mode-bbscript';


@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.scss']
})
export class GamingComponent implements OnInit, AfterViewInit {
  @ViewChild(AceDirective, { static: false }) directiveRef?: AceDirective;

  public ace: AceConfig;
  public code: string[];
  public section: 'game' | 'editor';

  constructor() {
    this.ace = {
      instance: null,
      config: {
        mode: 'bbscript',
        theme: 'terminal',
        wrap: true,
        readOnly: false
      },
      code: ''
    };

    this.section = 'editor';
  }

  ngOnInit() {
    this.code = ['Color 255, 128, 15', 'Rect 20, 35, 100, 75'];
  }

  ngAfterViewInit(): void {
    this.ace.instance = this.directiveRef.ace();
  }

  play() {
    this.section = 'game';
    this.code = this.ace.instance.getValue().split('\n');
  }

  stop() {
    this.section = 'editor';
    this.code = [];
  }

}
