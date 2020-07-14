import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LexerComponent } from './lexer.component';

const routes: Routes = [
  {
    path: '',
    component: LexerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LexerRoutingModule {}
