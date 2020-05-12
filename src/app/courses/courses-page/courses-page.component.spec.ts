import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('CoursesComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      providers: [provideMockStore({ initialState: { courses: { courses: [], pagination: {} } } })]
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
