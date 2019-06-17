import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeCenterComponent } from './home-center/home-center.component';
import { BlogComponent } from './blog/blog.component';
import { FutureComponent } from './future/future.component';

@NgModule({
  declarations: [HomeComponent, CalendarComponent, HomeCenterComponent, BlogComponent, FutureComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
