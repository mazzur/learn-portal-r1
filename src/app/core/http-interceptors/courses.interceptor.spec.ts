import { TestBed } from '@angular/core/testing';

import { CoursesInterceptor } from './courses.interceptor';

describe('CoursesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CoursesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CoursesInterceptor = TestBed.inject(CoursesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
