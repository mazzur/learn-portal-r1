import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import coursesListMock from './mocks/courses-list.mock.json';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(CoursesService);
  });

  it('should provide courses list', () => {
    expect(service).toBeTruthy();
  });
});
