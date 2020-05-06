import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CoursesService } from 'App/courses/courses.service';
import { Course } from 'App/courses/course';

@Component({
  selector: 'lp-course-details',
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss']
})
export class CourseDetailsPageComponent implements OnInit, OnDestroy {
  course: Course;
  pendingDeletionConfirmation = false;
  unsubscribeOnDestroy = new Subject();

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ course }) => {
      this.course = course;
    });
  }

  deleteCourse() {
    this.coursesService.deleteCourse(this.course.id)
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(() => this.router.navigate(['/courses']));
  }

  ngOnDestroy() {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

}
