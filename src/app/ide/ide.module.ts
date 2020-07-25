import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeComponent } from './ide.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BlitzBasicScriptGameModule } from 'bbscript/src/public_api';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, BlitzBasicScriptGameModule],
  declarations: [IdeComponent],
  exports: [IdeComponent]
})
export class IdeModule {}
