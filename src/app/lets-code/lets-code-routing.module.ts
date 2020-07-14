import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LetsCodeComponent } from './lets-code.component';

const routes: Routes = [
  {
    path: '',
    component: LetsCodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetsCodeRoutingModule {}
