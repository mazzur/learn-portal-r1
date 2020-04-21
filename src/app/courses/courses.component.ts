import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from 'App/courses/courses.service';
import { Course } from 'App/courses/course';

@Component({
  selector: 'lp-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Observable<Array<Course>>;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getCoursesList();
  }

}
