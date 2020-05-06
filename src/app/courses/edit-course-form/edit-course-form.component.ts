import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'App/courses/course';
import { CoursesService } from 'App/courses/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lp-edit-course',
  templateUrl: './edit-course-form.component.html',
  styleUrls: ['./edit-course-form.component.scss']
})
export class EditCourseFormComponent implements OnInit {
  courseForm: FormGroup;
  @Input() course: Course;

  constructor(private formBuilder: FormBuilder, private coursesService: CoursesService, private router: Router) {
  }

  get formTitle() {
    return this.course ? 'Edit course' : 'Create new course';
  }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group(this.course
      ? {
        title: this.course.title,
        description: this.course.description,
        duration: this.course.duration,
      } : {
        title: '',
        description: '',
        duration: 0,
      });
  }

  submitForm(editData: { title: string, description: string, duration: number }) {
    (
      this.course
        ? this.coursesService.updateCourse({ ...this.course, ...editData })
        : this.coursesService.createCourse(editData)
    ).subscribe(({ id }) => {
      this.router.navigate([`courses/${ id }`]);
    });
  }

}
