import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    const initialValues = this.course || {
      title: '',
      description: '',
      duration: 0,
      date: '',
      authors: [],
    };

    this.courseForm = this.formBuilder.group({
      title: [initialValues.title, [Validators.required, Validators.maxLength(50)]],
      description: [initialValues.description, [Validators.required, Validators.maxLength(500)]],
      duration: [initialValues.duration, [Validators.required]],
      date: [initialValues.date, [Validators.required]],
      authors: [initialValues.authors, [Validators.required]]
    });
  }

  submitForm(editData: { title: string, description: string, duration: number }) {
    (this.course
        ? this.coursesService.updateCourse({ ...this.course, ...editData })
        : this.coursesService.createCourse(editData)
    ).subscribe(({ id }) => {
      this.router.navigate([`courses/${ id }`]);
    });
  }

}
