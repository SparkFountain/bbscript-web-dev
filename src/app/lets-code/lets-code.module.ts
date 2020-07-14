import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetsCodeComponent } from './lets-code.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LetsCodeRoutingModule } from './lets-code-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, LetsCodeRoutingModule],
  declarations: [LetsCodeComponent],
})
export class LetsCodeModule {}
