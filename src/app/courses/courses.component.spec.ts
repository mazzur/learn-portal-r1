import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { CoursesService } from 'App/courses/courses.service';
import { of } from 'rxjs';

class MockCoursesService {
  fetchCourses() { return of({ results: [], pagination: {} }); }
}

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [{
        provide: CoursesService,
        useClass: MockCoursesService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
