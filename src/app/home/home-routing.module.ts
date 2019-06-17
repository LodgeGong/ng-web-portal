import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { HomeCenterComponent } from './home-center/home-center.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'',component:HomeCenterComponent},
      {path:'todolist',component:ToDoListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
