import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoursesService } from 'App/courses/courses.service';
import { Course } from 'App/courses/course';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'lp-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Array<Course>>;
  searchQuery$ = new Subject<string>();
  searchValue = '';

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courses$ = this.searchQuery$.pipe(
      startWith(this.searchValue),
      switchMap((query: string) => {
        this.searchValue = query;
        return this.coursesService.getCourses(query);
      })
    );
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id);
    this.getCourses();
  }

  addRandomCourse() {
    this.coursesService.addRandomCourse();
    this.getCourses();
  }
}
