import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpParams
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from 'App/courses/course';
import { MOCK_COURSES } from 'App/core/http-interceptors/mock-courses-injection-token';

@Injectable()
export class CoursesInterceptor implements HttpInterceptor {

  constructor(@Inject(MOCK_COURSES) private courses: Array<Course>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('courses')) {
      switch (request.method) {
        case 'GET':
          return this.getCourses(request.params);
        case 'DELETE':
          return this.deleteCourse(request.url.split('/').reverse()[0]);
        case 'POST':
          return this.addRandomCourse();
      }
    }

    return of(new HttpResponse());
  }

  private searchCoursesByQuery(query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return this.courses;
    }

    return this.courses.filter(({ title, description }) => title.toLowerCase().includes(normalizedQuery)
      || description.toLowerCase().includes(normalizedQuery));
  }

  private deleteCourse(courseId: string) {
    this.courses.splice(this.courses.findIndex(({ id }) => id === courseId), 1);
    return this.streamSuccessResponse();
  }

  private addRandomCourse() {
    const dummyRandomId = Math.floor(Math.random() * 100000);

    this.courses.push({
      id: `${ dummyRandomId }`,
      title: `Random course ${ dummyRandomId }`,
      description: 'Quite a random course description',
      creationDate: 'Sat, 1 May 2020 14:39:21 GMT',
      duration: 120,
      topRated: false,
    });

    return this.streamSuccessResponse();
  }

  private streamSuccessResponse(body: any = {}) {
    return of(new HttpResponse({
      status: 200,
      body,
    }));
  }

  private getCourses(params: HttpParams) {
    const page = Number(params.get('page'));
    const pageSize = Number(params.get('pageSize'));
    const isPageSizeAll = pageSize === -1;
    const matchingResults = this.searchCoursesByQuery(params.get('query') || '');

    return this.streamSuccessResponse({
      results: isPageSizeAll ? matchingResults : matchingResults
        .slice(page * pageSize, page * pageSize + pageSize),
      pagination: {
        totalNumberOfResults: matchingResults.length,
        numberOfPages: isPageSizeAll ? 1 : Math.ceil(matchingResults.length / pageSize),
        pageSize,
        page
      },
    });
  }
}
