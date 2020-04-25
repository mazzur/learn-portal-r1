import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'App/courses/courses.service';
import { Course } from 'App/courses/course';

@Component({
  selector: 'lp-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  searchValue = '';
  courses: Array<Course> = [];

  constructor(private coursesService: CoursesService) {
  }

  get noCoursesMessage() {
    return this.searchValue
      ? 'Couldn\'t find any courses matching your search query'
      : 'There are no courses available for you now. Feel free to add one';
  }

  ngOnInit(): void {
    this.coursesService.selectCourses()
      .subscribe((courses) => {
        this.courses = courses;
      });
    this.coursesService.queryCourses(this.searchValue);
  }

  searchCourses(searchValue: string) {
    this.searchValue = searchValue;
    this.coursesService.queryCourses(this.searchValue);
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id);
  }

  addRandomCourse() {
    this.coursesService.addRandomCourse();
  }
}
