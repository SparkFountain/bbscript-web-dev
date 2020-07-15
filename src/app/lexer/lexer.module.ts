import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LexerRoutingModule } from './lexer-routing.module';
import { LexerComponent } from './lexer.component';
import { TranslateModule } from '@ngx-translate/core';
import { AceModule } from 'ngx-ace-wrapper';
import { NgxPopperModule } from 'ngx-popper';

@NgModule({
  imports: [
    CommonModule,
    LexerRoutingModule,
    TranslateModule,
    AceModule,
    NgxPopperModule,
  ],
  declarations: [LexerComponent],
})
export class LexerModule {}
