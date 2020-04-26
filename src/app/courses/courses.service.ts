import { Injectable } from '@angular/core';
import { Course } from './course';
import { Subject } from 'rxjs';
import { PageSize } from 'App/shared/page-size-switcher/page-size-switcher.component';
import { HttpClient } from '@angular/common/http';

export interface Pagination {
  numberOfPages: number;
  totalNumberOfResults: number;
  page: number;
  pageSize: PageSize;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private pagedCourses$ = new Subject<{ courses: Array<Course>, pagination: Pagination }>();

  constructor(private httpClient: HttpClient) {
  }

  selectPagedCourses() {
    return this.pagedCourses$;
  }

  fetchCourses(query: string, pagination: Pagination) {
    this.httpClient.get('courses', {
      params: {
        query,
        page: JSON.stringify(pagination.page),
        pageSize: JSON.stringify(pagination.pageSize)
      }
    }).subscribe((response: { results: Array<Course>, pagination: Pagination }) => {
      this.pagedCourses$.next({
        courses: response.results,
        pagination: response.pagination
      });
    });
  }

  deleteCourse(courseId: string) {
    return this.httpClient.delete(`courses/${ courseId }`);
  }

  addRandomCourse() {
    return this.httpClient.post('courses', {});
  }
}
