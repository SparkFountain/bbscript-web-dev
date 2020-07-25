import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsBlogComponent } from './news-blog.component';

const routes: Routes = [
  {
    path: '',
    component: NewsBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsBlogRoutingModule {}
