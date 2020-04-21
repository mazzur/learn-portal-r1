import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { SharedModule } from 'App/shared/shared.module';
import { CourseDetailsComponent } from 'App/courses/course-details/course-details.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListItemComponent,
    CourseDetailsComponent
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
