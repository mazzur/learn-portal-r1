import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseFormComponent } from './edit-course-form.component';
import { CoursesService } from 'App/courses/courses.service';
import { mockService } from 'App/testing/helpers';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditCourseComponent', () => {
  let component: EditCourseFormComponent;
  let fixture: ComponentFixture<EditCourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ EditCourseFormComponent ],
      providers: [
        { provide: CoursesService, useValue: mockService(CoursesService) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
