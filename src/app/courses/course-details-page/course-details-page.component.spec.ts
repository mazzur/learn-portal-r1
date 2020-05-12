import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsPageComponent } from './course-details-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/ActivatedRouteStub';
import { CoursesService } from 'App/courses/store/courses.service';
import { mockService } from 'App/testing/helpers';
import { provideMockStore } from '@ngrx/store/testing';

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsPageComponent;
  let fixture: ComponentFixture<CourseDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsPageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub(), },
        { provide: CoursesService, useValue: mockService(CoursesService) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        provideMockStore({})
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
