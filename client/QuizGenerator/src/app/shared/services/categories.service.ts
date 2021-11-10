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

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private store: Store<State>,
    private router: Router,
    private http: HttpClient,
    private errorHandler: ErrorHandler,
    private asyncPipe: AsyncPipe
  ) {}

  getAllCategories(): Observable<Cateogry[]> {
    return this.http.get<any>(config.categoriesUrl).pipe(
      tap((data) => this.processResponse(data)),
      catchError(
        this.errorHandler.handleError<any>(
          'get all categories',
          'Request timeout'
        )
      )
    );
  }

  private processResponse(response: any): void {
    if (!isNil(response)) {
      // console.log(response);
    }
  }
}
