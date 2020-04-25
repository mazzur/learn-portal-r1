import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'App/courses/course';

@Component({
  selector: 'lp-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course: Course;
  @Output() delete = new EventEmitter<string>();

  get bgClass() {
    return this.course.topRated ? 'bg-top-rated' : 'bg-white';
  }
}
