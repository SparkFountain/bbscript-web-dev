import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetsCodeComponent } from './lets-code.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LetsCodeRoutingModule } from './lets-code-routing.module';
import { IdeModule } from '../ide/ide.module';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, LetsCodeRoutingModule, IdeModule],
  declarations: [LetsCodeComponent]
})
export class LetsCodeModule {}
