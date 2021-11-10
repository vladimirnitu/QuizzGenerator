import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AsyncPipe } from '@angular/common';
import * as fromShared from '../../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../shared/app.state';
import { combineLatest, Subject } from 'rxjs';
import { CategoriesService } from '../../../shared/services/categories.service';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../shared/models/user';
import { QuestionnaireService } from '../../../shared/services/questionnaire.service';
import { QuestionnaireRequestResponse } from '../../../shared/requests/questionnaire.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-my-questionnaires',
  templateUrl: './dashboard-my-questionnaires.component.html',
  styleUrls: ['./dashboard-my-questionnaires.component.scss'],
})
export class DashboardMyQuestionnairesComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  currentUser$ = this.store.select(fromShared.getLoggedUser);

  currentUser: User;
  questionnaires: QuestionnaireRequestResponse[];

  constructor(
    private store: Store<State>,
    private questionnaireService: QuestionnaireService,
    public router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([this.currentUser$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([currentUser]) => {
        this.currentUser = currentUser;
        this.questionnaireService
          .getQuestionnairesOfUser(currentUser.UserName)
          .subscribe((response) => {
            this.questionnaires = response;
          });
      });
  }

  openQuestionnaireAnswerPage(questionnaireID: string): void {
    this.router.navigate(['/questionnaire/' + questionnaireID]);
  }

  openQuestionnaireStatsPage(questionnaireID: string): void {
    this.router.navigate(['dashboard/questionnaire/' + questionnaireID]);
  }
}
