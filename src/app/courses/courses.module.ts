import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from 'App/shared/shared.module';
import { CourseDetailsComponent } from 'App/courses/course-details/course-details.component';
import { CoursesSearchControlComponent } from './courses-search-control/courses-search-control.component';
import { CourseCardHighlightDirective } from './course-card/course-card-highlight.directive';
import coursesListMock from './mocks/courses-list.mock.json';
import { MOCK_COURSES } from 'App/courses/mock-courses-injection-token';

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
  providers: [{
    provide: MOCK_COURSES,
    useValue: coursesListMock
  }]
})
export class CoursesModule { }
