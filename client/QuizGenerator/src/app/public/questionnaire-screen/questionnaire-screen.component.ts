import { Component, OnInit } from '@angular/core';
import * as fromShared from '../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../shared/app.state';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../shared/models/user';
import { QuestionnaireRequestResponse } from '../../shared/requests/questionnaire.request';
import { QuestionnaireService } from '../../shared/services/questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-screen',
  templateUrl: './questionnaire-screen.component.html',
  styleUrls: ['./questionnaire-screen.component.scss'],
})
export class QuestionnaireScreenComponent implements OnInit {
  currentUser: User;

  idNumber: string;

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.idNumber = this.route.snapshot.paramMap.get('questionnaireID');
  }
}
