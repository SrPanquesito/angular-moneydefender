import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../shared/course.service';
import { CourseModel } from '../shared/course-model';
import { LessonService } from '../shared/lesson.service';
import { LessonModel } from '../shared/lesson-model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  id: Number;
  course$: CourseModel;
  lessons$: Array<LessonModel>;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private lessonService: LessonService, private router: Router) {
    this.route.queryParams.subscribe(params => {
        this.id = params['id'];
    });
    
    if(this.id !== undefined) {
      courseService.getCourse(this.id).subscribe(course => {
        this.course$ = course;
      });
      lessonService.getAllLessonsByCourseId(this.id).subscribe(lessons => {
        this.lessons$ = lessons;
      });
    }
  }

  ngOnInit(): void {
  }

  goToLesson(id) {
    this.router.navigate(['/lesson'], { queryParams: { id: id } });
  }

}
