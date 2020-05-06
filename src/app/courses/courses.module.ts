import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from 'App/shared/shared.module';
import { CourseDetailsPageComponent } from 'App/courses/course-details-page/course-details-page.component';
import { CoursesSearchControlComponent } from './courses-search-control/courses-search-control.component';
import { CourseCardHighlightDirective } from './course-card/course-card-highlight.directive';
import { EditCourseFormComponent } from './edit-course-form/edit-course-form.component';
import { EditCoursePageComponent } from './edit-course-page/edit-course-page.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseCardComponent,
    CourseDetailsPageComponent,
    CoursesSearchControlComponent,
    CourseCardHighlightDirective,
    EditCourseFormComponent,
    EditCoursePageComponent
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule
  ],
})
export class CoursesModule { }
