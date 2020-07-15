import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { KeywordsComponent } from './keywords/keywords.component';
import { CommandsComponent } from './commands/commands.component';
import { ConstantsAndScancodesComponent } from './constants-and-scancodes/constants-and-scancodes.component';
import { DifferencesToBlitzBasicComponent } from './differences-to-blitz-basic/differences-to-blitz-basic.component';

@NgModule({
  imports: [CommonModule, DocumentationRoutingModule, TranslateModule, FormsModule],
  declarations: [DocumentationComponent, KeywordsComponent, CommandsComponent, ConstantsAndScancodesComponent, DifferencesToBlitzBasicComponent]
})
export class DocumentationModule {}
