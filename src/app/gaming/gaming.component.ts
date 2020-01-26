import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AceDirective } from 'ngx-ace-wrapper';
import { AceConfig } from '../interfaces/ace-config.interface';

import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
import 'brace/theme/cobalt';
import 'brace/theme/terminal';
import '../../assets/ace/mode-bbscript';
import { Observable, Subscriber, concat, of } from 'rxjs';
import { tap, withLatestFrom, map, switchMap } from 'rxjs/operators';


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
    this.testingSection();
  }

  /** BEGIN OF TESTING SECTION */
  testingSection() {
    console.info('Testing section');

    let variable = { value: 0 };
    const obsArray$: Observable<any>[] = [];

    const obs1$ = new Observable<void>((observer: Subscriber<void>) => {
      variable.value = 42;
      observer.next();
      observer.complete();
    });
    obsArray$.push(obs1$);

    // DOES NOT WORK
    // obsArray$.push(this.addValues$(variable, 58).pipe(
    //   tap((result: number) => console.info('TEST RESULT:', result))
    // ));

    // WORKS
    const params: [{ value: number }, number] = [variable, 58];
    obsArray$.push(of(null).pipe(
      switchMap(() => this.addValues$(...params)),
      tap((result) => console.info('TEST RESULT:', result))
    ));

    // obsArray$.push(this.addValues$(variable, 58).pipe(
    //   tap((result: number) => console.info('TEST RESULT:', result))
    // ));

    concat(...obsArray$).subscribe();
  }

  addValues$(x: { value: number }, y: number) {
    return of(x.value + y);
  }

  /** END OF TESTING SECTION */

  play() {
    this.section = 'game';
    this.code = this.ace.instance.getValue().split('\n');
  }

  stop() {
    this.section = 'editor';
    this.code = [];
  }

}