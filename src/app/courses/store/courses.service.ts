import { Injectable } from '@angular/core';
import { Course } from '../course';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {
  }

  fetchCourseById(id: string) {
    return this.httpClient.get<Course>(`${ environment.apiUrl }/courses/${ id }`);
  }

  createCourse(course: Partial<Course>) {
    return this.httpClient.post<Course>(`${ environment.apiUrl }/courses`, {
      ...course,
      creationDate: new Date().toUTCString()
    });
  }

  updateCourse(course: Course) {
    return this.httpClient.put<Course>(`${ environment.apiUrl }/courses/${ course.id }`, course);
  }
}
