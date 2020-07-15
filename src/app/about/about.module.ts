import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { AceModule } from 'ngx-ace-wrapper';
import { PostModule } from '../post/post.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    AceModule,
    PostModule,
    TranslateModule,
  ],
  declarations: [AboutComponent],
})
export class AboutModule {}
