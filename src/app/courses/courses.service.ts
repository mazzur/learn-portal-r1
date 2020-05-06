import { Injectable } from '@angular/core';
import { Course } from './course';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {
  }

  fetchCourses(query: string, page: number, limit: number) {
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
          numberOfPages: Math.ceil(totalNumberOfResults / limit),
        };
    }));
  }

  fetchCourseById(id: string) {
    return this.httpClient.get<Course>(`${ environment.apiUrl }/courses/${ id }`);
  }

  deleteCourse(courseId: string) {
    return this.httpClient.delete(`${ environment.apiUrl }/courses/${ courseId }`);
  }

  addRandomCourse() {
    const dummyRandomId = Math.floor(Math.random() * 100000);

    return this.httpClient.post(`${ environment.apiUrl }/courses`, {
      title: `Random course ${ dummyRandomId }`,
      description: 'Quite a random course description',
      creationDate: 'Sat, 1 May 2020 14:39:21 GMT',
      duration: 120,
      topRated: false,
    });
  }

  createCourse(course: Partial<Course>) {
    return this.httpClient.post<Course>(`${ environment.apiUrl }/courses`, {
      ...course,
      creationDate: new Date().toUTCString()
    });
  }

  updateCourse(course: Course) {
    return this.httpClient.put<Course>(`${ environment.apiUrl }/courses/${course.id}`, course);
  }
}
