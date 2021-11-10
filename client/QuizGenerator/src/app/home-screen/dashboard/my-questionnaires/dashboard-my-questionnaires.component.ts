import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AsyncPipe } from '@angular/common';
import * as fromShared from '../../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../shared/app.state';
import { Subject } from 'rxjs';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
  selector: 'app-dashboard-my-questionnaires',
  templateUrl: './dashboard-my-questionnaires.component.html',
  styleUrls: ['./dashboard-my-questionnaires.component.scss'],
})
export class DashboardMyQuestionnairesComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  isLoggedIn$ = this.store.select(fromShared.isUserLogged);
  currentUser$ = this.store.select(fromShared.getLoggedUser);

  constructor(
    private store: Store<State>,
    private categoriesService: CategoriesService,
    private asyncPipe: AsyncPipe
  ) {}

  ngOnInit(): void {}
}
