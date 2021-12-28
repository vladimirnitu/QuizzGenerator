import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AsyncPipe } from '@angular/common';
import * as fromShared from '../../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../shared/app.state';
import { combineLatest, forkJoin, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { User } from '../../../shared/models/user';
import { QuestionnaireRequestResponse } from '../../../shared/requests/questionnaire.request';
import { QuestionnaireService } from '../../../shared/services/questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNil } from 'lodash-es';
import { errorResults } from '../../../shared/config';

@Component({
  selector: 'app-dashboard-main-screen',
  templateUrl: './dashboard-main-screen.component.html',
  styleUrls: ['./dashboard-main-screen.component.scss'],
})
export class DashboardMainScreenComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  currentUser$ = this.store.select(fromShared.getLoggedUser);

  currentUser: User;
  questionnaires: QuestionnaireRequestResponse[] = [];
  responseCount: { [code: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private questionnaireService: QuestionnaireService,
    public router: Router,
    public async: AsyncPipe
  ) {}

  ngOnInit(): void {
    this.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      if (!isNil(currentUser)) {
        forkJoin([
          this.questionnaireService.getQuestionnairesOfUser(
            currentUser.UserName
          ),
          this.questionnaireService.getQuestionnairesOfUser('admin'),
        ])
          .pipe(
            tap(([response1, response2]) => {
              console.log(response2);
              this.questionnaires = response1.concat(response2);
            })
          )
          .subscribe();
      }
    });
  }

  goToNewQuestionnaire(): void {
    this.router.navigate(['dashboard-new'], { relativeTo: this.route });
  }

  goToMyQuestionnaires(): void {
    this.router.navigate(['dashboard-list'], { relativeTo: this.route });
  }
}
