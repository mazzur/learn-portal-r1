import { Inject, Injectable } from '@angular/core';
import { Course } from './course';
import { Subject } from 'rxjs';
import { MOCK_COURSES } from 'App/courses/mock-courses-injection-token';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses$ = new Subject<Array<Course>>();
  private query = '';

  constructor(@Inject(MOCK_COURSES) private courses: Array<Course>) {
  }

  private filterCourses(normalizedQuery: string) {
    return this.courses.filter(({ title, description }) => title.toLowerCase().includes(normalizedQuery)
      || description.toLowerCase().includes(normalizedQuery));
  }

  selectCourses() {
    return this.courses$;
  }

  queryCourses(query: string = '') {
    this.query = query.trim().toLowerCase();

    this.courses$.next(
      this.query
        ? this.filterCourses(this.query)
        : this.courses
    );
  }

  deleteCourse(courseId: string) {
    this.courses.splice(this.courses.findIndex(({ id }) => id === courseId), 1);
    this.queryCourses(this.query);
  }

  addRandomCourse() {
    const dummyRandomId = Math.floor(Math.random() * 100000);

    this.courses.push({
      id: `${ dummyRandomId }`,
      title: `Random course ${ dummyRandomId }`,
      description: 'Quite a random course description',
      creationDate: 'Sat, 1 May 2020 14:39:21 GMT',
      duration: 120,
      topRated: false,
    });
    this.queryCourses(this.query);
  }
}
