import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsRoutingModule } from './commands-routing.module';
import { CommandsComponent } from './commands.component';
import { TranslateModule } from '@ngx-translate/core';
import { BlitzBasicScriptCanvasComponent } from 'bbscript/src/components/canvas/canvas.component';

@NgModule({
  imports: [CommonModule, CommandsRoutingModule, TranslateModule],
  declarations: [CommandsComponent, BlitzBasicScriptCanvasComponent],
})
export class CommandsModule {}
