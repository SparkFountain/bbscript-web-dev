import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeComponent } from './ide.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IdeComponent],
  exports: [IdeComponent]
})
export class IdeModule {}
