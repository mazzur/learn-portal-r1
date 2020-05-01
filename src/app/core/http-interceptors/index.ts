import { CoursesInterceptor } from 'App/core/http-interceptors/courses.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const httpInterceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CoursesInterceptor, multi: true }
];
