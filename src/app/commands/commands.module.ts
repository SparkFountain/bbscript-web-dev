import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsRoutingModule } from './commands-routing.module';
import { CommandsComponent } from './commands.component';
import { TranslateModule } from '@ngx-translate/core';
import { BlitzBasicScriptCanvasModule } from 'bbscript/src/components/canvas/canvas.module';
import { AceModule } from 'ngx-ace-wrapper';

@NgModule({
  imports: [
    CommonModule,
    CommandsRoutingModule,
    TranslateModule,
    BlitzBasicScriptCanvasModule,
    AceModule,
  ],
  declarations: [CommandsComponent],
})
export class CommandsModule {}
