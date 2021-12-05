import { Component, OnInit } from '@angular/core';
import * as fromShared from '../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../shared/app.state';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as sharedActions from '../../shared/state/shared.actions';
import { User } from '../../shared/models/user';
import { Globals } from '../../shared/globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  isLoggedIn$ = this.store.select(fromShared.isUserLogged);
  currentUser$ = this.store.select(fromShared.getLoggedUser);

  isLoggedIn = false;
  currentUser: User;

  title = Globals.title;
  logoPath = Globals.logoPath;

  constructor(private store: Store<State>, public router: Router) {}

  ngOnInit(): void {
    combineLatest([this.isLoggedIn$, this.currentUser$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([isLoggedIn, currentUser]) => {
        this.isLoggedIn = isLoggedIn;
        this.currentUser = currentUser;
      });
  }

  logout(): void {
    this.router.navigate(['/home']);
    this.store.dispatch(sharedActions.logoutUser());
  }
}
