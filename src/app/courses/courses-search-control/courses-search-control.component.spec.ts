import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSearchControlComponent } from './courses-search-control.component';

describe('CoursesSearchControlComponent', () => {
  let component: CoursesSearchControlComponent;
  let fixture: ComponentFixture<CoursesSearchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesSearchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
