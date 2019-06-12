import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AssembleComponent } from './assemble/assemble.component';

const routes: Routes = [
  { path: '', redirectTo: 'main/assemble', pathMatch: 'full' },
  { path: 'main', loadChildren: './layout#LayoutModule' }
  // { path: 'main', component: AssembleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
