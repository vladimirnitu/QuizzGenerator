import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { State } from '../shared/app.state';
import * as fromShared from '../shared/state/shared.selectors';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as sharedActions from '../shared/state/shared.actions';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  isUserLoggedIn$ = this.store.select(fromShared.isUserLogged);

  title = Globals.title;
  logoPath = Globals.logoPath;

  isLoggedIn = false;

  navButtonsList = [
    {
      name: 'Home',
      link: '/home',
    },
    {
      name: 'About us',
      link: '/home',
    },
    {
      name: 'Contact',
      link: '/home',
    },
  ];

  constructor(
    private store: Store<State>,
    public router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    combineLatest([this.isUserLoggedIn$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([isLoggedIn]) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  register(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.store.dispatch(sharedActions.logoutUser());
    this.router.navigate(['/home']);
  }

  openDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  inDashboard(): boolean {
    return this.router.url === '/dashboard';
  }
}
