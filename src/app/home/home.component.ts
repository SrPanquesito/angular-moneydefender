import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../shared/course-model';
import { CourseService } from '../shared/course.service';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses$: Array<CourseModel> = [];
  user: string;

  constructor(private courseService: CourseService, private authService: AuthService) {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses$ = courses;
    });
    this.user = this.authService.getUserName();
  }

  ngOnInit(): void {
  }

}
