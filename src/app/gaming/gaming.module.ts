import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamingComponent } from './gaming.component';
import { GamingRoutingModule } from './gaming-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BlitzBasicScriptGameModule } from 'bbscript/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    GamingRoutingModule,
    TranslateModule,
    BlitzBasicScriptGameModule,
  ],
  declarations: [GamingComponent],
})
export class GamingModule {}
