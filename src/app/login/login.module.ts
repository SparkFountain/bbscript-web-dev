import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, TranslateModule, FormsModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
