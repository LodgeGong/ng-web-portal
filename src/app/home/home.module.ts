import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { HomeCenterComponent } from './home-center/home-center.component';

@NgModule({
  declarations: [HomeComponent, ToDoListComponent, HomeCenterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
