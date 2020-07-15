import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamingComponent } from './gaming.component';
import { GamingRoutingModule } from './gaming-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BlitzBasicScriptGameModule } from 'bbscript/src/public_api';
import { AceModule } from 'ngx-ace-wrapper';

@NgModule({
  imports: [
    CommonModule,
    GamingRoutingModule,
    TranslateModule,
    BlitzBasicScriptGameModule,
    AceModule,
  ],
  declarations: [GamingComponent],
})
export class GamingModule {}
