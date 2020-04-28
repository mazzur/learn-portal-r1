import { Injectable } from '@angular/core';
import { Course } from './course';
import { Subject } from 'rxjs';
import { PageSize } from 'App/shared/page-size-switcher/page-size-switcher.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  constructor(private httpClient: HttpClient) {
  }

  fetchCourses(query: string, pagination: Pagination) {
    return this.httpClient.get<{ results: Array<Course>, pagination: Pagination }>('courses', {
      params: {
        query,
        page: JSON.stringify(pagination.page),
        pageSize: JSON.stringify(pagination.pageSize)
      }
    });
  }

  deleteCourse(courseId: string) {
    return this.httpClient.delete(`courses/${ courseId }`);
  }

  addRandomCourse() {
    return this.httpClient.post('courses', {});
  }
}
