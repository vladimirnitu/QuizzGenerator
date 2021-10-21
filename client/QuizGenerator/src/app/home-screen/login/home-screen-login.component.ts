import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../shared/requests/login.request';
import { AuthService } from '../../shared/services/auth.service';
import * as fromShared from '../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../shared/app.state';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-home-screen-login',
  templateUrl: './home-screen-login.component.html',
  styleUrls: ['./home-screen-login.component.scss'],
})
export class HomeScreenLoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  destroyed$: Subject<void> = new Subject<void>();
  isUserLoggedIn$ = this.store.select(fromShared.isUserLogged);

  isLoggedIn = false;

  constructor(
    public dialog: MatDialog,
    private store: Store<State>,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([this.isUserLoggedIn$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([isLoggedIn]) => {
        this.isLoggedIn = isLoggedIn;
      });

    this.loginForm = this.formBuilder.group({
      email: [''], // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      password: [''],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    const loginRequest: LoginRequest = {
      username: this.f.email.value,
      password: this.f.password.value,
    };

    this.authService.login(loginRequest).subscribe((response) => {
      this.openDialog(response);
      if (response.isAccessGranted) {
        this.router.navigate(['./home']);
      }
      //this.router.navigate([this.authService.INITIAL_PATH]);
    });
  }

  openDialog(response: any): void {
    this.dialog.open(LoginDialogComponent, { data: response });
  }

  // getUser(): void {
  //   this.authService.getCurrentUser$()
  //     .subscribe(user => this.user = user);
  // }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.component.html',
})
export class LoginDialogComponent {
  isAccessGranted: boolean;
  user: User;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.isAccessGranted = data.isAccessGranted;
    this.user = data.user;
  }
}
