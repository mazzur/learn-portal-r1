import { Injectable } from '@angular/core';
import { Course } from './course';
import { of } from 'rxjs';
import coursesListMock from './mocks/courses-list.mock.json';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Array<Course> = coursesListMock;

  private filterCourses(normalizedQuery: string) {
    return this.courses.filter(({ title, description }) => title.toLowerCase().includes(normalizedQuery)
      || description.toLowerCase().includes(normalizedQuery));
  }

  getCourses(query: string = '') {
    const normalizedQuery = query.trim().toLowerCase();

    return of(
      normalizedQuery
        ? this.filterCourses(normalizedQuery)
        : this.courses
    );
  }

  deleteCourse(courseId: string) {
    this.courses.splice(this.courses.findIndex(({ id }) => id === courseId), 1);
  }

  addRandomCourse() {
    const dummyRandomId = Math.floor(Math.random() * 100000);

    this.courses.push({
      id: `${ dummyRandomId }`,
      title: `Random course ${ dummyRandomId }`,
      description: 'Quite a random course description',
      creationDate: 'Sat, 1 May 2020 14:39:21 GMT',
      duration: 120,
    });
  }
}
