import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../shared/course-model';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses$: Array<CourseModel> = [];

  constructor(private courseService: CourseService) {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses$ = courses;
    });
  }

  ngOnInit(): void {
  }

}
