import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LessonModel } from './lesson-model';
import { environment } from 'src/environments/environment';
import { QuestionaryModel } from './questionary-model';
import { CorrectAnswersModel } from './correct-answers.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  getAllLessons(): Observable<Array<LessonModel>> {
    return this.http.get<Array<LessonModel>>(environment.api + '/api/lesson');
  }

  getAllLessonsByCourseId(cId): Observable<Array<LessonModel>> {
    return this.http.get<Array<LessonModel>>(environment.api + '/api/lesson/by-course/' + cId);
  }

  getLesson(id): Observable<LessonModel> {
    return this.http.get<LessonModel>(environment.api + '/api/lesson/' + id);
  }

  getQuestionary(): Observable<Array<QuestionaryModel>> {
    return this.http.get<Array<QuestionaryModel>>(environment.api + '/api/questionary');
  }

  getQuestionaryByLessonId(id): Observable<QuestionaryModel> {
    return this.http.get<QuestionaryModel>(environment.api + '/api/questionary/by-lesson/' + id);
  }

  postCorrectAnswer(payload: CorrectAnswersModel): Observable<any> {
    return this.http.post<any>(environment.api + '/api/correct-answers', payload);
  }

  getCorrectAnswersByUserId(id): Observable<Array<CorrectAnswersModel>> {
    return this.http.get<Array<CorrectAnswersModel>>(environment.api + '/api/correct-answers/by-user/' + id);
  }

  getCorrectAnswersByUser(username): Observable<Array<CorrectAnswersModel>> {
    return this.http.get<Array<CorrectAnswersModel>>(environment.api + '/api/correct-answers/by-username/' + username);
  }
}
