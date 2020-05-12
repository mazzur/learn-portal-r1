import {
  ActionReducerMap,
  createReducer,
  MetaReducer, on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Course } from 'App/courses/course';
import { loadCoursesSuccess, searchCourses, updatePagination } from 'App/courses/store/courses.actions';
import { Pagination } from 'App/courses/courses-page/courses-page.component';

export interface CoursesState {
  courses: Array<Course>;
  pagination: Pagination | {};
  query: string;
}

export const coursesReducers: ActionReducerMap<CoursesState> = {
  courses: createReducer([], on(
    loadCoursesSuccess,
    (state, { courses }) => courses)
  ),
  query: createReducer('', on(
    searchCourses,
    (state, { query }) => query)
  ),
  pagination: createReducer({}, on(
    loadCoursesSuccess,
    (state, { numberOfPages, totalNumberOfResults }) => {
      return {
        ...state,
        numberOfPages,
        totalNumberOfResults,
      };
    }),
    on(updatePagination, (state, { pagination }) => pagination)
  )
};


export const metaReducers: MetaReducer<CoursesState>[] = !environment.production ? [] : [];
