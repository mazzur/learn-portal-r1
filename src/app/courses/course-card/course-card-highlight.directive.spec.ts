import { CourseCardHighlightDirective } from './course-card-highlight.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('CourseCardHighlightDirective', () => {
  const twoWeeksInMs = 1000 * 60 * 60 * 24 * 14;

  let fixture: ComponentFixture<any>;
  let elements: any;
  let currentDate;
  let testCourseCreationDates: any;

  beforeEach(() => {
    jasmine.clock().mockDate(new Date('25 Apr 2020'));
  });

  beforeEach(() => {
    currentDate = Date.now();

    testCourseCreationDates = {
      currentDate,
      moreThan2WeeksAgo: currentDate - twoWeeksInMs,
      lessThan2WeeksAgo: currentDate - twoWeeksInMs + 1,
      nextMonth: currentDate + 1
    };

    @Component({
      template: `${
        Object.keys(testCourseCreationDates).map((key: string) => `
        <div
          id="${ key }"
          lpCourseCardHighlight
          [creationDate]="${ testCourseCreationDates[key] }"
        ></div>
      `)
      }`
    })
    class TestComponent {
    }

    fixture = TestBed.configureTestingModule({
      declarations: [CourseCardHighlightDirective, TestComponent]
    })
      .createComponent(TestComponent);

    fixture.detectChanges();

    elements = Object.keys(testCourseCreationDates).reduce((elementsMap: object, key: string) => ({
      ...elementsMap,
      [key]: fixture.debugElement.query(By.css(`#${ key }`)),
    }), {});
  });

  it('should highlight with blue color upcoming courses', () => {
    expect(elements.nextMonth.nativeElement.style.borderLeft).toBe('4px solid rgba(50, 118, 212, 0.5)');
  });

  it('should highlight with green color recent course', () => {
    expect(elements.currentDate.nativeElement.style.borderLeft).toBe('4px solid rgba(39, 137, 61, 0.5)');
    expect(elements.lessThan2WeeksAgo.nativeElement.style.borderLeft).toBe('4px solid rgba(39, 137, 61, 0.5)');
  });

  it('should not highlight courses created more then 2 weeks ago', () => {
    expect(elements.moreThan2WeeksAgo.nativeElement.style.borderLeft).toBe('');
  });
});
