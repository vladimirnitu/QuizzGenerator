import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AsyncPipe } from '@angular/common';
import * as fromShared from '../../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../shared/app.state';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-main-screen',
  templateUrl: './dashboard-main-screen.component.html',
  styleUrls: ['./dashboard-main-screen.component.scss'],
})
export class DashboardMainScreenComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  isLoggedIn$ = this.store.select(fromShared.isUserLogged);
  currentUser$ = this.store.select(fromShared.getLoggedUser);

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private asyncPipe: AsyncPipe
  ) {}

  ngOnInit(): void {}

  printUsr(): void {
    console.log(this.asyncPipe.transform(this.currentUser$));
  }
}
