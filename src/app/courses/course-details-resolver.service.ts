import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from 'App/courses/store/courses.service';
import { switchMap } from 'rxjs/operators';
import { Course } from 'App/courses/course';
import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsResolverService implements Resolve<Course> {

  constructor(private coursesService: CoursesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('courseId');

    if (!id) {
      this.router.navigate(['/courses']);
      return EMPTY;
    }

    return this.coursesService.fetchCourseById(id)
      .pipe(
        switchMap((course: Course) => {
          if (!course) {
            this.router.navigate(['/courses']);
            return EMPTY;
          }
          return of(course);
        })
      );
  }
}
