import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CoursesService } from 'App/courses/store/courses.service';
import { Course } from 'App/courses/course';
import { Store } from '@ngrx/store';
import { deleteCourse } from '../store/courses.actions';

@Component({
  selector: 'lp-course-details',
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss']
})
export class CourseDetailsPageComponent implements OnInit, OnDestroy {
  course: Course;
  pendingDeletionConfirmation = false;
  unsubscribeOnDestroy = new Subject();

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ course }) => {
      this.course = course;
    });
  }

  deleteCourse() {
    this.store.dispatch(deleteCourse({ id: this.course.id }));
  }

  ngOnDestroy() {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

}
