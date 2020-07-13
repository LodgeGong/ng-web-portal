import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home/login', pathMatch: 'full'},
  { path: 'home', loadChildren:'./home/home.module#HomeModule',canActivate: [AuthGuard]},
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
