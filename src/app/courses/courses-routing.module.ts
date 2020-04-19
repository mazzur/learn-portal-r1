import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from 'App/courses/course-details/course-details.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: ':courseId', component: CourseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
