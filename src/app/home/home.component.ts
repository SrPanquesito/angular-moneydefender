import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../shared/course-model';
import { CourseService } from '../shared/course.service';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { LessonService } from '../shared/lesson.service';
import { CorrectAnswersModel } from '../shared/correct-answers.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses$: Array<CourseModel> = [];
  correctAnswers$: Array<CorrectAnswersModel> = [];
  user: string;
  progress: number = 0;

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router, private lessonService: LessonService) {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses$ = courses;
    });
    this.user = this.authService.getUserName();

    let arr;
    this.lessonService.getQuestionary().subscribe(data => {
      arr = data.length;
      this.lessonService.getCorrectAnswersByUser(this.user).subscribe(data => {
        let res = (data.length*100)/arr;
        this.progress = res;
      }, err => {
        console.log(err);
      });
    });
  }

  ngOnInit(): void {
  }

  goToCourse(id) {
    this.router.navigate(['/course'], { queryParams: { id: id } });
  }

}
