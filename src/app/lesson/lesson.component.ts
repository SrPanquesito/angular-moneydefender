import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../shared/lesson.service';
import { LessonModel } from '../shared/lesson-model';
import { QuestionaryModel } from '../shared/questionary-model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1
      })),
      state('closed', style({
        height: '0',
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class LessonComponent implements OnInit {
  id: Number;
  lesson$: LessonModel;
  questionary$: QuestionaryModel;
  isOpen = false;
  answers$: any;
  radioSelected: any;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
        this.id = params['id'];
    });

    if(this.id !== undefined) {
      this.lessonService.getLesson(this.id).subscribe(lesson => {
        this.lesson$ = lesson;
      });
      this.lessonService.getQuestionaryByLessonId(this.id).subscribe(questionary => {
        this.questionary$ = questionary;
        var myStr = questionary.answers.replace(/'/g,'"');
        var myArr = JSON.parse(myStr);
        this.answers$ = myArr;
        console.log(this.answers$);
      });
    }
  }

  ngOnInit(): void {
  }

  toggleQuest() {
    this.isOpen = !this.isOpen;
  }

  submitAnswer() {
    if(+this.radioSelected === this.questionary$.correctAnswer) {
        this.toastr.success('Respuesta Correcta!');
    } else {
        this.toastr.error('Respuesta incorrecta...');
    }
  }

}
