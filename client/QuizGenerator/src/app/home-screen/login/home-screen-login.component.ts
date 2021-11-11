import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import {
  RegisterRequest,
  RegisterRequestResponses,
} from '../../shared/requests/register.request';

@Component({
  selector: 'app-home-screen-login',
  templateUrl: './home-screen-login.component.html',
  styleUrls: ['./home-screen-login.component.scss'],
})
export class HomeScreenLoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  signupForm: FormGroup = new FormGroup({});

  destroyed$: Subject<void> = new Subject<void>();
  isUserLoggedIn$ = this.store.select(fromShared.isUserLogged);

  isLoggedIn = false;
  inLogin = true;

  emailControl = new FormControl('', [
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]);
  userNameOrEmailControl = new FormControl('', [Validators.required]);
  userNameControl = new FormControl('', [
    Validators.pattern(
      '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
    ),
  ]);
  loginPasswordControl = new FormControl('', [Validators.required]);
  registerPasswordControl = new FormControl('', [Validators.required]);
  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);

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
      emailOrUsername: this.userNameOrEmailControl,
      password: this.loginPasswordControl,
    });

    this.signupForm = this.formBuilder.group({
      email: this.emailControl,
      username: this.userNameControl,
      password: this.registerPasswordControl,
      firstname: this.firstNameControl,
      lastname: this.lastNameControl,
    });
  }

  login(): void {
    const loginRequest: LoginRequest = {
      username: this.loginForm.controls.emailOrUsername.value,
      email: this.loginForm.controls.emailOrUsername.value,
      password: this.loginForm.controls.password.value,
    };

    this.authService.login(loginRequest).subscribe((response) => {
      this.openLoginDialog(response);
      if (response.isAccessGranted) {
        this.router.navigate(['./dashboard']);
      }
      //this.router.navigate([this.authService.INITIAL_PATH]);
    });
  }

  signup(): void {
    const registerRequest: RegisterRequest = {
      username: this.signupForm.controls.username.value,
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value,
      firstName: this.signupForm.controls.firstname.value,
      name: this.signupForm.controls.lastname.value,
    };

    this.authService.register(registerRequest).subscribe((response) => {
      if (response === RegisterRequestResponses.ALREADY_IN_USE) {
        this.openRegisterDialog(response);
        return;
      }

      this.router.navigate(['./dashboard']);
      //this.router.navigate([this.authService.INITIAL_PATH]);
    });
  }

  openLoginDialog(response: any): void {
    this.dialog.open(LoginDialogComponent, { data: response });
  }

  openRegisterDialog(response: any): void {
    this.dialog.open(RegisterDialogComponent, { data: response });
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

@Component({
  selector: 'app-register-dialog',
  templateUrl: 'register-dialog.component.html',
})
export class RegisterDialogComponent {
  response: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.response = data;
  }
}
