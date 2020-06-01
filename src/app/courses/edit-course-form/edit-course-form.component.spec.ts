import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseFormComponent } from './edit-course-form.component';
import { CoursesService } from 'App/courses/courses.service';
import { mockService } from 'App/testing/helpers';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DurationControlComponent } from 'App/shared/duration-control/duration-control.component';
import { DateControlComponent } from 'App/shared/date-control/date-control.component';
import { AuthorsControlComponent } from 'App/courses/authors-control/authors-control.component';
import { AuthorsService } from 'App/courses/authors-control/authors.service';
import { DurationPipe } from 'App/shared/duration.pipe';
import { Subject } from 'rxjs';

describe('EditCourseComponent', () => {
  let component: EditCourseFormComponent;
  let fixture: ComponentFixture<EditCourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        EditCourseFormComponent,
        DurationControlComponent,
        DateControlComponent,
        AuthorsControlComponent,
        DurationPipe
      ],
      providers: [
        { provide: CoursesService, useValue: mockService(CoursesService) },
        { provide: AuthorsService, useValue: { suggestions$: new Subject() } },
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
