import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren:'./home/home.module#HomeModule'},
  { path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // ,{ enableTracing: true }   // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
