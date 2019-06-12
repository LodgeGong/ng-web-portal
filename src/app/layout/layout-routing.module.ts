import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      // { path: 'preview', loadChildren: '../preview#PreviewModule' },
      { path: 'assemble', loadChildren: '../assemble#AssembleModule' }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LayoutRoutingModule { }
