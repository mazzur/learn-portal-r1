import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from 'App/shared/shared.module';
import { CourseDetailsComponent } from 'App/courses/course-details/course-details.component';
import { CoursesSearchControlComponent } from './courses-search-control/courses-search-control.component';
import { CourseCardHighlightDirective } from './course-card/course-card-highlight.directive';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    CourseDetailsComponent,
    CoursesSearchControlComponent,
    CourseCardHighlightDirective
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule
  ],
})
export class CoursesModule { }
