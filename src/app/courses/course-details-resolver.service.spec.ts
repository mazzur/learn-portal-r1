import { TestBed } from '@angular/core/testing';

import { CourseDetailsResolverService } from './course-details-resolver.service';
import { CoursesService } from 'App/courses/courses.service';
import { mockService } from 'App/testing/helpers';
import { Router } from '@angular/router';

describe('ProductDetailsResolverService', () => {
  let service: CourseDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CoursesService, useValue: mockService(CoursesService) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ]
    });
    service = TestBed.inject(CourseDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
