import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeCenterComponent } from './home-center/home-center.component';
import { BlogComponent } from './blog/blog.component';
import { FutureComponent } from './future/future.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HomeComponent, CalendarComponent, HomeCenterComponent, BlogComponent, FutureComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  providers:[]
})
export class HomeModule { }
