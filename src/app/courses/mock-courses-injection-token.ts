import { InjectionToken } from '@angular/core';
import { Course } from 'App/courses/course';
import coursesListMock from 'App/courses/mocks/courses-list.mock.json';

export const MOCK_COURSES = new InjectionToken<Array<Course>>('mock courses list', {
  providedIn: 'root',
  // TODO: get better idea of how injection works
  factory: () => coursesListMock
});
