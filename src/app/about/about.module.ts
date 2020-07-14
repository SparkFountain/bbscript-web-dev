import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { AceModule } from 'ngx-ace-wrapper';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, AceModule],
  declarations: [AboutComponent],
})
export class AboutModule {}
