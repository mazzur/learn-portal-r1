import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'lp-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseId: Observable<string>;

  constructor(private route: ActivatedRoute) {
    this.courseId = route.params.pipe(map(p => p.courseId));
  }

  ngOnInit(): void {
  }

}
