import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamingComponent } from './gaming.component';

const routes: Routes = [
  {
    path: '',
    component: GamingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamingRoutingModule {}
