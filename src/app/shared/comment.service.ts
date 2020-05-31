import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAllCommentsForLesson(lessonId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>(environment.api + '/api/comments/by-lesson/' + lessonId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.post<any>(environment.api + '/api/comments', commentPayload);
  }
}
