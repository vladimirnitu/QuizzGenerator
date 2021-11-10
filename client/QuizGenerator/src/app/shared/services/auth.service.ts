import { combineLatest, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from '../config';
import { LoginRequest, LoginRequestResponses } from '../requests/login.request';
import { catchError, takeUntil, tap } from 'rxjs/operators';
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
import * as fromShared from '../state/shared.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  destroyed$: Subject<void> = new Subject<void>();
  isUserLoggedIn$ = this.store.select(fromShared.isUserLogged);

  isUserLoggedIn = false;

  constructor(
    private store: Store<State>,
    private router: Router,
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {
    combineLatest([this.isUserLoggedIn$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([isUserLoggedIn]) => {
        this.isUserLoggedIn = isUserLoggedIn;
      });
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(config.registerUrl, registerRequest).pipe(
      tap((data) => this.doRegisterUser(data)),
      catchError(
        this.errorHandler.handleError<any>(
          'register',
          RegisterRequestResponses.ALREADY_IN_USE
        )
      )
    );
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(config.loginUrl, loginRequest).pipe(
      tap((data) => this.doLoginUser(data.isAccessGranted, data.user)),
      catchError(
        this.errorHandler.handleError<any>(
          'login',
          LoginRequestResponses.BAD_CREDENTIALS
        )
      )
    );
  }

  private doRegisterUser(user: User): void {
    if (!isNil(user)) {
      const loggedUser: User = user;
      this.store.dispatch(sharedActions.loginUser({ loggedUser }));
    }
  }

  private doLoginUser(isAccessGranted: boolean, user: User): void {
    if (!isAccessGranted) {
      return;
    }
    const loggedUser: User = user;
    this.store.dispatch(sharedActions.loginUser({ loggedUser }));
  }

  getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
}
