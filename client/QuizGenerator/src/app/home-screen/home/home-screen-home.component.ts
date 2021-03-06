import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AsyncPipe } from '@angular/common';
import * as fromShared from '../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../shared/app.state';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen-home',
  templateUrl: './home-screen-home.component.html',
  styleUrls: ['./home-screen-home.component.scss'],
})
export class HomeScreenHomeComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  isLoggedIn$ = this.store.select(fromShared.isUserLogged);
  currentUser$ = this.store.select(fromShared.getLoggedUser);

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private asyncPipe: AsyncPipe,
    public router: Router
  ) {}

  ngOnInit(): void {}

  printUsr(): void {
    console.log(this.asyncPipe.transform(this.currentUser$));
  }
}
