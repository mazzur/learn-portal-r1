import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseDetailsPageComponent } from 'App/courses/course-details-page/course-details-page.component';
import { EditCoursePageComponent } from 'App/courses/edit-course-page/edit-course-page.component';
import { EditCourseFormComponent } from 'App/courses/edit-course-form/edit-course-form.component';
import { CourseDetailsResolverService } from 'App/courses/course-details-resolver.service';

const routes: Routes = [
  { path: '', component: CoursesPageComponent },
  { path: 'new', data: { breadcrumb: 'new' }, component: EditCourseFormComponent },
  {
    path: ':courseId',
    resolve: {
      course: CourseDetailsResolverService,
    },
    component: CourseDetailsPageComponent
  },
  {
    path: ':courseId/edit',
    resolve: {
      course: CourseDetailsResolverService,
    },
    component: EditCoursePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}
