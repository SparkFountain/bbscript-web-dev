import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsComponent } from './commands.component';
import { TranslateModule } from '@ngx-translate/core';
import { IdeModule } from 'src/app/ide/ide.module';

@NgModule({
  imports: [CommonModule, TranslateModule, IdeModule],
  declarations: [CommandsComponent],
  exports: [CommandsComponent]
})
export class CommandsModule {}
