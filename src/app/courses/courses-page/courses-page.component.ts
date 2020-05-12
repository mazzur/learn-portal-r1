import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'App/courses/course';
import { Subject } from 'rxjs';
import { PageSize, PageSizeOption } from 'App/shared/page-size-switcher/page-size-switcher.component';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectCoursesData } from 'App/courses/store/courses.selectors';
import { deleteCourse, updatePagination, searchCourses, addRandomCourse } from 'App/courses/store/courses.actions';

export interface Pagination {
  numberOfPages: number;
  totalNumberOfResults: number;
  page: number;
  pageSize: PageSize;
  infiniteLoad: boolean;
}

@Component({
  selector: 'lp-courses',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  courses: Array<Course> = [];
  searchValue = '';
  activePageSizeOption: PageSizeOption = 3;
  pagination: Pagination = {
    numberOfPages: 0,
    totalNumberOfResults: 0,
    page: 1,
    pageSize: 3,
    infiniteLoad: false,
  };
  private unsubscribeOnDestroy = new Subject();

  constructor(private store: Store) {
  }

  get noCoursesMessage() {
    return this.searchValue
      ? 'Couldn\'t find any courses matching your search query'
      : 'There are no courses available for you now. Feel free to add one';
  }

  get isLoadMoreBtnVisible() {
    return this.pagination.infiniteLoad && this.pagination.page !== this.pagination.numberOfPages;
  }

  get isPageSwitcherVisible() {
    return this.pagination.numberOfPages > 1 && !this.pagination.infiniteLoad;
  }

  get viewingCount() {
    return `Viewing ${ this.courses.length } of ${ this.pagination.totalNumberOfResults }`;
  }

  ngOnInit(): void {
    this.store.pipe(select(selectCoursesData))
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(({ courses, pagination, searchValue }) => {
        this.courses = courses;
        this.searchValue = searchValue;
        this.pagination = {
          ...this.pagination,
          ...pagination
        };
      });
    this.store.dispatch(updatePagination({ pagination: this.pagination }));
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  searchCourses(searchValue: string) {
    this.store.dispatch(searchCourses({ query: searchValue }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(deleteCourse({ id }));
  }

  addRandomCourse() {
    this.store.dispatch(addRandomCourse());
  }

  changePageSize(pageSizeOption: PageSizeOption) {
    this.activePageSizeOption = pageSizeOption;
    this.store.dispatch(updatePagination({
      pagination: {
        ...this.pagination,
        pageSize: pageSizeOption === 'all' ? 6 : pageSizeOption,
        infiniteLoad: pageSizeOption === 'all',
        page: 1
      }
    }));
  }

  changePage(page: number) {
    this.store.dispatch(updatePagination({
      pagination: {
        ...this.pagination,
        page
      }
    }));
  }
}
