import { Component, Input } from '@angular/core';
import { Course } from 'App/courses/course';

@Component({
  selector: 'lp-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})
export class CoursesListItemComponent {
  @Input() course: Course;
}
