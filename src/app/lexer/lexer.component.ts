import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
import 'brace/theme/cobalt';
import 'brace/theme/terminal';
import '../../assets/ace/mode-bbscript';
import { LexerToken } from 'bbscript/src/interfaces/lexer-token';
import { BlitzBasicScriptGameService } from 'bbscript/src/public_api';
import { AceDirective } from 'ngx-ace-wrapper';
import { AceConfig } from '../interfaces/ace-config.interface';

@Component({
  selector: 'app-lexer',
  templateUrl: './lexer.component.html',
  styleUrls: ['./lexer.component.scss']
})
export class LexerComponent implements OnInit, AfterViewInit {
  @ViewChild(AceDirective, { static: false }) directiveRef?: AceDirective;

  public ace: AceConfig;
  public tokenArrays: LexerToken[][];

  public section: 'editor' | 'tokens' | 'table';

  constructor(private bbscript: BlitzBasicScriptGameService) {
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ace.instance = this.directiveRef.ace();
  }

  goTo(section: 'editor' | 'tokens' | 'table'): void {
    if (section !== 'editor') {
      // perform lexing
      this.lex();
    }
    this.section = section;
  }

  lex(): void {
    const code: string[] = this.ace.instance.getValue().split('\n');
    this.tokenArrays = this.bbscript.lexCode(code);
    console.info('TOKENS', this.tokenArrays);
  }

  saveTokens(): void {
    // this.developService.setTokens(this.tokenArrays);
  }
}
