import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeCenterComponent } from './home-center/home-center.component';
import { BlogComponent } from './blog/blog.component';
import { FutureComponent } from './future/future.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'',component:HomeCenterComponent},
      {path:'calendar',component:CalendarComponent},
      {path:'blog',component:BlogComponent},
      {path:'future',component:FutureComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
