import { Observable } from 'rxjs';
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
      .post<any>(config.createQuestionnaire + category, request)
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
      .post<any>(config.createQuestion + questionnaireName, request)
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

  private processResponse(response: QuestionnaireRequestResponse): void {
    if (!isNil(response)) {
      // console.log(response);
    }
  }
}
