import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NewsBlogComponent } from './news-blog.component';
import { NewsBlogRoutingModule } from './news-blog-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, NewsBlogRoutingModule],
  declarations: [NewsBlogComponent]
})
export class NewsBlogModule {}
