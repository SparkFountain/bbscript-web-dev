import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandsComponent } from './commands.component';

const routes: Routes = [
  {
    path: '',
    component: CommandsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandsRoutingModule {}
