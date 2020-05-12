import { createAction, props } from '@ngrx/store';
import { Course } from 'App/courses/course';
import { Pagination } from 'App/courses/courses-page/courses-page.component';

export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{id: string}>()
);

export const addRandomCourse = createAction(
  '[Course] Add random Course'
);

export const courseAdded = createAction(
  '[Course] Course Added'
);

export const updatePagination = createAction(
  '[Courses] Update Pagination',
  props<{ pagination: Pagination }>()
);

export const searchCourses = createAction(
  '[Courses] search courses',
  props<{ query: string }>()
);

export const courseDeleted = createAction(
  '[Course] Course Deleted'
);

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Array<Course>, numberOfPages: number, totalNumberOfResults: number }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: any }>()
);
