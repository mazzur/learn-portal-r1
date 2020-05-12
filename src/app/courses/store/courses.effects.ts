import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addRandomCourse, courseAdded,
  courseDeleted,
  deleteCourse,
  loadCoursesSuccess,
  searchCourses,
  updatePagination
} from 'App/courses/store/courses.actions';
import { CoursesService } from 'App/courses/store/courses.service';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectCoursesData } from 'App/courses/store/courses.selectors';
import { Course } from 'App/courses/course';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class CoursesEffects {


  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store,
    private httpClient: HttpClient
  ) {
  }

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(updatePagination, searchCourses),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(selectCoursesData)))
    )),
    switchMap(([action, state]: any) => {
      return this.fetchCourses(state.query, state.pagination.page, state.pagination.pageSize)
        .pipe(map(({ courses, totalNumberOfResults }) => {
          return loadCoursesSuccess({
            courses: (state.pagination.infiniteLoad && state.pagination.page !== 1)
              ? [...state.courses, ...courses]
              : courses,
            numberOfPages: Math.ceil(totalNumberOfResults / state.pagination.pageSize),
            totalNumberOfResults
          });
        }));
    })
    )
  );

  updateCourses$ = createEffect(() => this.actions$.pipe(
    ofType(courseDeleted, courseAdded),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(selectCoursesData)))
    )),
    switchMap(([action, state]: any) => {
      const limit = state.pagination.infiniteLoad
        ? state.pagination.page * state.pagination.pageSize
        : state.pagination.pageSize;
      const page = state.pagination.infiniteLoad ? 0 : state.pagination.page;

      return this.fetchCourses(state.query, page, limit)
        .pipe(map(({ courses, totalNumberOfResults }) =>
          loadCoursesSuccess({
            courses,
            numberOfPages: Math.ceil(totalNumberOfResults / state.pagination.pageSize),
            totalNumberOfResults
          })));
    })
    )
  );

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCourse),
    switchMap(({ id }) => {
      return this.httpClient.delete(`${ environment.apiUrl }/courses/${ id }`)
        .pipe(map(courseDeleted));
    })
    )
  );

  addRandomCourse$ = createEffect(() => this.actions$.pipe(
    ofType(addRandomCourse),
    switchMap(() => {
      const dummyRandomId = Math.floor(Math.random() * 100000);

      return this.httpClient.post(`${ environment.apiUrl }/courses`, {
        title: `Random course ${ dummyRandomId }`,
        description: 'Quite a random course description',
        creationDate: 'Sat, 1 May 2020 14:39:21 GMT',
        duration: 120,
        topRated: false,
      }).pipe(map(courseAdded));
    })
    )
  );

  private fetchCourses(query: string, page: number, limit: number) {
    return this.httpClient.get<Array<Course>>(
      `${ environment.apiUrl }/courses`, {
        params: new HttpParams()
          .set('_page', JSON.stringify(page))
          .set('_limit', JSON.stringify(limit))
          .set('q', query),
        observe: 'response'
      }).pipe(map((response) => {
      const totalNumberOfResults = Number(response.headers.get('X-Total-Count'));

      return {
        courses: response.body as Array<Course>,
        totalNumberOfResults,
      };
    }));
  }
}
