import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { CoursesService } from 'App/courses/courses.service';
import { mockService } from 'App/testing/helpers';
import { Observable, of } from 'rxjs';
import testCourses from 'App/courses/__testing__/test-courses-list.json';

describe('CoursesComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let mockCoursesService;

  beforeEach(async(() => {
    mockCoursesService = mockService(CoursesService);
    mockCoursesService.fetchCourses.and.returnValue(of({
      courses: testCourses,
      totalNumberOfResults: 2
    }));
    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      providers: [{
        provide: CoursesService,
        useValue: mockCoursesService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
