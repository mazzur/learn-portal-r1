import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import coursesListMock from './mocks/courses-list.mock.json';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
  });

  it('should provide courses list', (done) => {
    service.getCoursesList().subscribe(list => {
      expect(list).toEqual(coursesListMock);
      done();
    });
  });
});
