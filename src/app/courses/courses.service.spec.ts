import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import coursesListMock from './mocks/courses-list.mock.json';
import { Course } from 'App/courses/course';
import { MOCK_COURSES } from 'App/courses/mock-courses-injection-token';

describe('CoursesService', () => {
  let service: CoursesService;
  let courses: Array<Course>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MOCK_COURSES,
          useValue: JSON.parse(JSON.stringify(coursesListMock)),
        }
      ]
    });
    service = TestBed.inject(CoursesService);
    service.selectCourses().subscribe(list => {
      courses = list;
    });
  });

  it('should provide full courses list for empty query', () => {
    service.queryCourses();
    expect(courses).toEqual(coursesListMock);
  });

  it('should search for relevant courses based on query', () => {
    service.queryCourses(coursesListMock[0].title);
    expect(courses).toEqual([coursesListMock[0]]);
  });

  it('should delete course and stream updated list', async () => {
    service.deleteCourse(coursesListMock[0].id);
    expect(courses).toEqual(coursesListMock.slice(1));
  });

  it('should add random course and stream updated list', async () => {
    service.addRandomCourse();
    expect(courses.length).toBe(5);
  });
});
