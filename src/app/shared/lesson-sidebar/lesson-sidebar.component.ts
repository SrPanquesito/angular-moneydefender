import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from '../comment.payload';
import { CommentService } from '../comment.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-lesson-sidebar',
  templateUrl: './lesson-sidebar.component.html',
  styleUrls: ['./lesson-sidebar.component.scss']
})
export class LessonSidebarComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollChat') private scrollChat: ElementRef;
  @Input() fromCourse: Number;
  @Input() lessonId: number;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments$: CommentPayload[];
  isError: boolean;

  constructor(private commentService: CommentService, private router: Router) {
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      lessonId: this.lessonId
    };
  }

  ngOnInit(): void {
    this.getCommentsForLesson();
    this.scrollToBottom();
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentPayload.lessonId = this.lessonId;
    
    if(this.commentPayload.text === "" || this.commentPayload.text === null) {
      this.isError = true;
    } else {
      this.isError = false;
      this.commentService.postComment(this.commentPayload).subscribe(data => {
        this.commentForm.get('text').setValue('');
        this.getCommentsForLesson();
      }, error => {
        throwError(error);
      })
    }

  }

  backToCourse() {
    this.router.navigate(['/course'], { queryParams: { id: this.fromCourse } });
  }

  // Private para que solo jale en ngOnInit :3
  private getCommentsForLesson() {
    this.commentService.getAllCommentsForLesson(this.lessonId).subscribe(data => {
      this.comments$ = data;
    }, error => {
      throwError(error);
    });
  }

  scrollToBottom(): void {
    try {
        this.scrollChat.nativeElement.scrollTop = this.scrollChat.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

}
