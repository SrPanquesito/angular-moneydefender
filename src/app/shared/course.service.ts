import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from './course-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Array<CourseModel>> {
    return this.http.get<Array<CourseModel>>(environment.api + '/api/course');
  }

  getCourse(id): Observable<CourseModel> {
    return this.http.get<CourseModel>(environment.api + '/api/course/' + id);
  }
}
