import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursePageComponent } from './edit-course-page.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'App/testing/ActivatedRouteStub';

describe('EditCoursePageComponent', () => {
  let component: EditCoursePageComponent;
  let fixture: ComponentFixture<EditCoursePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoursePageComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub(),
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
