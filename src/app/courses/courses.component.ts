import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService, Pagination } from 'App/courses/courses.service';
import { Course } from 'App/courses/course';
import { Subscription } from 'rxjs';
import { PageSize } from 'App/shared/page-size-switcher/page-size-switcher.component';

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
  private pagedCoursesSubscription: Subscription;

  constructor(private coursesService: CoursesService) {
  }

  get noCoursesMessage() {
    return this.searchValue
      ? 'Couldn\'t find any courses matching your search query'
      : 'There are no courses available for you now. Feel free to add one';
  }

  ngOnInit(): void {
    this.pagedCoursesSubscription = this.coursesService.selectPagedCourses()
      .subscribe(({ courses, pagination }) => {
        this.courses = courses;
        this.pagination = pagination;

        if (pagination.page >= pagination.numberOfPages) {
          this.pagination.page = this.pagination.page - 1;
          this.fetchCourses();
        }
      });
    this.fetchCourses();
  }

  ngOnDestroy(): void {
    this.pagedCoursesSubscription.unsubscribe();
  }

  private fetchCourses() {
    this.coursesService.fetchCourses(this.searchValue, this.pagination);
  }

  searchCourses(searchValue: string) {
    this.searchValue = searchValue;
    this.fetchCourses();
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id)
      .subscribe(() => this.fetchCourses());
  }

  addRandomCourse() {
    this.coursesService.addRandomCourse()
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
