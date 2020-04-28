import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService, Pagination } from 'App/courses/courses.service';
import { Course } from 'App/courses/course';
import { Subject } from 'rxjs';
import { PageSize } from 'App/shared/page-size-switcher/page-size-switcher.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lp-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Array<Course> = [];
  searchValue = '';
  pagination: Pagination = {
    numberOfPages: 0,
    totalNumberOfResults: 0,
    page: 0,
    pageSize: 3
  };
  private unsubscribeOnDestroy = new Subject();

  constructor(private coursesService: CoursesService) {
  }

  get noCoursesMessage() {
    return this.searchValue
      ? 'Couldn\'t find any courses matching your search query'
      : 'There are no courses available for you now. Feel free to add one';
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  private fetchCourses() {
    this.coursesService.fetchCourses(this.searchValue, this.pagination)
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(({ results, pagination }) => {
        this.courses = results;
        this.pagination = pagination;

        if (pagination.page >= pagination.numberOfPages) {
          this.pagination.page = this.pagination.page - 1;
          this.fetchCourses();
        }
      });
  }

  searchCourses(searchValue: string) {
    this.searchValue = searchValue;
    this.fetchCourses();
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id)
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(() => this.fetchCourses());
  }

  addRandomCourse() {
    this.coursesService.addRandomCourse()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(() => this.fetchCourses());
  }

  changePageSize(pageSize: PageSize) {
    this.pagination = {
      ...this.pagination,
      pageSize,
      page: 0
    };
    this.fetchCourses();
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.fetchCourses();
  }
}
