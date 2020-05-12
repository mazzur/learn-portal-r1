import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CoursesPageComponent } from 'App/courses/courses-page/courses-page.component';
import testCourses from 'App/courses/__testing__/test-courses-list.json';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { CourseCardComponent } from 'App/courses/course-card/course-card.component';
import { CoursesSearchControlComponent } from 'App/courses/courses-search-control/courses-search-control.component';
import { CourseCardHighlightDirective } from 'App/courses/course-card/course-card-highlight.directive';
import { DurationPipe } from 'App/shared/duration.pipe';
import { PageSwitcherComponent } from 'App/shared/page-switcher/page-switcher.component';
import { By } from '@angular/platform-browser';
import { Course } from 'App/courses/course';
import { PageSizeSwitcherComponent } from 'App/shared/page-size-switcher/page-size-switcher.component';
import { StoreModule } from '@ngrx/store';
import { coursesReducers } from 'App/courses/store/courses.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from 'App/courses/store/courses.effects';
import { metaReducers } from 'App/reducers';

describe('Courses Page', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(coursesReducers, {
          metaReducers
        }),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('courses', coursesReducers),
        EffectsModule.forFeature([CoursesEffects])
      ],
      declarations: [
        CoursesPageComponent,
        CourseCardComponent,
        CoursesSearchControlComponent,
        CourseCardHighlightDirective,
        PageSwitcherComponent,
        PageSizeSwitcherComponent,
        DurationPipe
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function expectFetchCoursesAndFlush(
    { page = 1, limit = 3, query = '', total = testCourses.length } = {},
    responseBody = testCourses.slice(0, 3)
  ) {
    httpTestingController.expectOne(
      `${ environment.apiUrl }/courses?_page=${ page }&_limit=${ limit }&q=${ query }`
    ).flush(responseBody, {
      headers: {
        'X-Total-Count': `${ total }`,
      }
    });
    fixture.detectChanges();
  }

  function expectRenderedCoursesToMatch(pageData: Array<Course>) {
    expect(
      Array.from(fixture.nativeElement.querySelectorAll('.e2e-course-card'))
        .map((el: any) => el.querySelector('.e2e-course-card-title').innerText)
    ).toEqual(pageData.map(({ title }: Course) => title.toUpperCase()));
  }

  describe('should fetch first courses page once initialized', () => {
    beforeEach(() => {
      expectFetchCoursesAndFlush();
    });

    it('and render received course items', () => {
      expectRenderedCoursesToMatch(testCourses.slice(0, 3));
    });

    it('and render second page once user selects one', () => {
      fixture.debugElement
        .queryAll(By.css('.e2e-pagination button'))[1]
        .triggerEventHandler('click', null);

      const secondPageData = testCourses.slice(3, 6);
      expectFetchCoursesAndFlush({ page: 2 }, secondPageData);
      expectRenderedCoursesToMatch(secondPageData);
    });

    it('and render 6 items if user changes page size to 6', () => {
      fixture.debugElement
        .queryAll(By.css('.e2e-page-size-switcher button'))[1]
        .triggerEventHandler('click', null);

      const pageData = testCourses.slice(0, 6);
      expectFetchCoursesAndFlush({ limit: 6 }, pageData);
      expectRenderedCoursesToMatch(pageData);
    });

    it('and render matching courses once user starts searching', fakeAsync(() => {
      const query = 'dishes';
      const searchInputDe = fixture.debugElement
        .query(By.css('.e2e-courses-search'));
      searchInputDe.nativeElement.value = query;
      searchInputDe.triggerEventHandler('input', null);
      tick(300);

      const pageData = testCourses.slice(0, 1);
      expectFetchCoursesAndFlush({ query, total: 1 }, pageData);
      expectRenderedCoursesToMatch(pageData);
    }));
  });
});
