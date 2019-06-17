import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AssembleComponent } from './assemble/assemble.component';

const routes: Routes = [
  { path: ':id', component: AssembleComponent, children: [] },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
