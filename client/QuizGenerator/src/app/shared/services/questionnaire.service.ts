import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from '../config';
import { LoginRequest, LoginRequestResponses } from '../requests/login.request';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../app.state';
import * as sharedActions from '../state/shared.actions';
import { AsyncPipe } from '@angular/common';
import { ErrorHandler } from '../helpers/error-handler';
import { isNil } from 'lodash-es';
import {
  RegisterRequest,
  RegisterRequestResponses,
} from '../requests/register.request';
import { Cateogry } from '../models/cateogry';
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
    private errorHandler: ErrorHandler,
    private asyncPipe: AsyncPipe
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

  private processResponse(response: QuestionnaireRequestResponse): void {
    if (!isNil(response)) {
      console.log(response);
    }
  }
}
