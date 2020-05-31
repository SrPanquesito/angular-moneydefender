import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../shared/course-model';
import { CourseService } from '../shared/course.service';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses$: Array<CourseModel> = [];
  user: string;

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router) {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses$ = courses;
    });
    this.user = this.authService.getUserName();
  }

  ngOnInit(): void {
  }

  goToCourse(id) {
    this.router.navigate(['/course'], { queryParams: { id: id } });
  }

}
