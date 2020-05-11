import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from 'App/courses/courses.service';
import { Course } from 'App/courses/course';
import { Subject } from 'rxjs';
import { PageSize } from 'App/shared/page-size-switcher/page-size-switcher.component';
import { takeUntil } from 'rxjs/operators';

interface Pagination {
  numberOfPages: number;
  totalNumberOfResults: number;
  page: number;
  pageSize: PageSize;
}

@Component({
  selector: 'lp-courses',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  courses: Array<Course> = [];
  searchValue = '';
  pagination: Pagination = {
    numberOfPages: 0,
    totalNumberOfResults: 0,
    page: 1,
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

  get isLoadMoreBtnVisible() {
    return this.isInfiniteScroll && this.pagination.page !== this.pagination.numberOfPages;
  }

  get isPageSwitcherVisible() {
    return this.pagination.numberOfPages > 1 && !this.isInfiniteScroll;
  }

  get isInfiniteScroll() {
    return this.pagination.pageSize === 'all';
  }

  get viewingCount() {
    return `Viewing ${ this.courses.length } of ${ this.pagination.totalNumberOfResults }`;
  }

  ngOnInit(): void {
    this.coursesService.coursesData$
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(({ courses, numberOfPages, totalNumberOfResults }) => {
        this.courses = (this.isInfiniteScroll && this.pagination.page !== 1)
          ? [...this.courses, ...courses]
          : courses;
        this.pagination.totalNumberOfResults = totalNumberOfResults;
        this.pagination.numberOfPages = numberOfPages;
      });
    this.fetchCoursesPage();
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  private fetchCoursesPage() {
    const limit = this.pagination.pageSize === 'all' ? 6 : this.pagination.pageSize;
    this.coursesService.fetchCourses(this.searchValue, this.pagination.page, limit);
  }

  private refreshInfiniteCoursesList() {
    const limit = this.courses.length;
    this.coursesService.fetchCourses(this.searchValue, 0, limit);
  }

  searchCourses(searchValue: string) {
    this.searchValue = searchValue;
    this.fetchCoursesPage();
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id)
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(() => this.isInfiniteScroll ? this.refreshInfiniteCoursesList() : this.fetchCoursesPage());
  }

  addRandomCourse() {
    this.coursesService.addRandomCourse()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(() => this.isInfiniteScroll ? this.refreshInfiniteCoursesList() : this.fetchCoursesPage());
  }

  changePageSize(pageSize: PageSize) {
    this.pagination = {
      ...this.pagination,
      pageSize,
      page: 1
    };
    this.fetchCoursesPage();
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.fetchCoursesPage();
  }
}
