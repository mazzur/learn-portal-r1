import { Injectable } from '@angular/core';
import { Course } from './course';
import { of } from 'rxjs';
import coursesListMock from './mocks/courses-list.mock.json';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Array<Course> = coursesListMock;

  getCoursesList() {
    return of(this.courses);
  }
}
