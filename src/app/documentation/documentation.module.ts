import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, DocumentationRoutingModule, TranslateModule],
  declarations: [DocumentationComponent],
})
export class DocumentationModule {}
