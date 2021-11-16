import { observable, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from '../config';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../app.state';
import { AsyncPipe } from '@angular/common';
import { ErrorHandler } from '../helpers/error-handler';
import { isNil } from 'lodash-es';
import {
  AnswerForQuestionnaire,
  DeleteQuestionnaireRequest,
  QuestionnaireQuestionRequest,
  QuestionnaireQuestionRequestResponse,
  QuestionnaireRequest,
  QuestionnaireRequestResponse,
} from '../requests/questionnaire.request';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(
    private store: Store<State>,
    private router: Router,
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {}

  createQuestionnaire(
    request: QuestionnaireRequest,
    category: string
  ): Observable<QuestionnaireRequestResponse> {
    return this.http
      .post<any>(
        config.createQuestionnaire + encodeURIComponent(category),
        request
      )
      .pipe(
        tap((data) => this.processResponse(data)),
        catchError(
          this.errorHandler.handleError<any>(
            'create questionnaire',
            'Request timeout'
          )
        )
      );
  }

  createQuestionnaireQuestion(
    request: QuestionnaireQuestionRequest,
    questionnaireName: string
  ): Observable<QuestionnaireQuestionRequestResponse> {
    return this.http
      .post<any>(
        config.createQuestion + encodeURIComponent(questionnaireName),
        request
      )
      .pipe(
        tap((data) => this.processResponse(data)),
        catchError(
          this.errorHandler.handleError<any>(
            'create question',
            'Request timeout'
          )
        )
      );
  }

  getQuestionnairesOfUser(
    username: string
  ): Observable<QuestionnaireRequestResponse[]> {
    return this.http
      .get<any>(config.getAllQuestionnairesOfUser + username)
      .pipe(
        tap((data) => this.processResponse(data)),
        catchError(
          this.errorHandler.handleError<any>(
            'get all questionnaires of user',
            'Request timeout'
          )
        )
      );
  }

  getQuestionnaireByCode(
    questionnaireCode: string
  ): Observable<QuestionnaireRequestResponse> {
    return this.http
      .get<any>(config.getQuestionnaireByCode + questionnaireCode)
      .pipe(
        tap((data) => this.processResponse(data)),
        catchError(
          this.errorHandler.handleError<any>(
            'get questionnaire by code',
            'Request timeout'
          )
        )
      );
  }

  getQuestionsOfQuestionnaireByCode(
    questionnaireCode: string
  ): Observable<QuestionnaireQuestionRequestResponse[]> {
    return this.http
      .get<any>(config.getQuestionsOfQuestionnaireByCode + questionnaireCode)
      .pipe(
        tap((data) => this.processResponse(data)),
        catchError(
          this.errorHandler.handleError<any>(
            'get all questionf of questionnaire by code',
            'Request timeout'
          )
        )
      );
  }

  createAnswer(request: AnswerForQuestionnaire): Observable<any> {
    return this.http.post<any>(config.createAnswer, request).pipe(
      tap((data) => this.processResponse(data)),
      catchError(
        this.errorHandler.handleError<any>('create answer', 'Request timeout')
      )
    );
  }

  deleteQuestionnaire(
    username: string,
    questionnaireCode: string
  ): Observable<any> {
    return this.http
      .delete<any>(
        config.deleteQuestionnaire + username + '/' + questionnaireCode
      )
      .pipe(
        tap((data) => this.processResponse(data)),
        catchError(
          this.errorHandler.handleError<any>(
            'delete questionnaire',
            'Request timeout'
          )
        )
      );
  }

  processResponse(response: any): void {
    if (isNil(response)) {
      console.log('NULL RESPONSE');
    }
  }
}
