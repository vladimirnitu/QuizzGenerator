import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import * as fromShared from '../../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../shared/app.state';
import { combineLatest, Subject } from 'rxjs';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Cateogry } from '../../../shared/models/cateogry';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { castTo } from '../../../shared/helpers/castTo';
import { QuestionnaireService } from '../../../shared/services/questionnaire.service';
import {
  QuestionnaireQuestionRequest,
  QuestionnaireRequest,
} from '../../../shared/requests/questionnaire.request';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../shared/models/user';
import { Router } from '@angular/router';
import { isNil } from 'lodash-es';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

export enum DialogResult {
  YES = 'YES',
  NO = 'NO',
}

@Component({
  selector: 'app-dashboard-new-questionnaire',
  templateUrl: './dashboard-new-questionnaire.component.html',
  styleUrls: ['./dashboard-new-questionnaire.component.scss'],
})
export class DashboardNewQuestionnaireComponent implements OnInit {
  destroyed$: Subject<void> = new Subject<void>();
  isLoggedIn$ = this.store.select(fromShared.isUserLogged);
  currentUser$ = this.store.select(fromShared.getLoggedUser);

  isLoggedIn: boolean;
  currentUser: User;

  $castToFormGroup = castTo<FormGroup>();
  $castToFormArray = castTo<FormArray>();
  $castToFormControl = castTo<FormControl>();
  categories: Cateogry[] = [];

  questionnaireForm: FormGroup = new FormGroup({});
  titleControl: FormControl;
  categoriesControl: FormControl;
  questionsControl: FormArray;

  constructor(
    private store: Store<State>,
    private categoriesService: CategoriesService,
    private questionnaireService: QuestionnaireService,
    private asyncPipe: AsyncPipe,
    private formBuilder: FormBuilder,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.questionnaireForm = new FormGroup({});
    this.initializeControllers();
  }

  ngOnInit(): void {
    combineLatest([this.isLoggedIn$, this.currentUser$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([isLoggedIn, currentUser]) => {
        this.isLoggedIn = isLoggedIn;
        this.currentUser = currentUser;
      });

    this.categoriesService.getAllCategories().subscribe((response) => {
      this.categories = response;

      this.questionnaireForm = this.formBuilder.group({
        title: this.titleControl,
        category: this.categoriesControl,
        questions: this.questionsControl,
      });
    });
  }

  initializeControllers(): void {
    this.titleControl = new FormControl('', Validators.required);
    this.categoriesControl = new FormControl('', Validators.required);

    this.questionsControl = new FormArray([
      new FormGroup({
        nameControl: new FormControl('', Validators.required),
        possibleAnswersControl: new FormArray([
          new FormControl('', Validators.required),
          new FormControl('', Validators.required),
        ]),
      }),
    ]);
  }

  addPossibleAnswer(i: number): void {
    (
      (this.questionsControl.controls[i] as FormGroup).controls
        .possibleAnswersControl as FormArray
    ).push(new FormControl('', Validators.required));
  }

  removePossibleAnswer(i: number, j: number): void {
    (
      (this.questionsControl.controls[i] as FormGroup).controls
        .possibleAnswersControl as FormArray
    ).removeAt(j);
  }

  addQuestion(): void {
    this.questionsControl.push(
      new FormGroup({
        nameControl: new FormControl('', Validators.required),
        possibleAnswersControl: new FormArray([
          new FormControl('', Validators.required),
          new FormControl('', Validators.required),
        ]),
      })
    );
  }

  removeQuestion(i: number): void {
    this.questionsControl.removeAt(i);
  }

  resetQuestionnaire(): void {
    this.questionnaireForm.controls.title.setValue('');
    this.questionnaireForm.controls.category.setValue('');
    (this.questionnaireForm.controls.questions as FormArray).controls[0]
      .get('nameControl')
      .setValue('');
    for (const ct of (
      (this.questionnaireForm.controls.questions as FormArray).controls[0].get(
        'possibleAnswersControl'
      ) as FormArray
    ).controls) {
      ct.setValue('');
    }
    (
      (this.questionnaireForm.controls.questions as FormArray).controls[0].get(
        'possibleAnswersControl'
      ) as FormArray
    ).controls = (
      (this.questionnaireForm.controls.questions as FormArray).controls[0].get(
        'possibleAnswersControl'
      ) as FormArray
    ).controls.slice(0, 2);
    (this.questionnaireForm.controls.questions as FormArray).controls = (
      this.questionnaireForm.controls.questions as FormArray
    ).controls.slice(0, 1);
  }

  createQuestionnaire(): void {
    const createQuestionnaireRequest: QuestionnaireRequest = {
      username: this.currentUser.UserName,
      name: this.questionnaireForm.controls.title.value,
    };
    const category = this.questionnaireForm.controls.category.value;

    this.questionnaireService
      .createQuestionnaire(createQuestionnaireRequest, category)
      .subscribe((response) => {
        const last = (this.questionnaireForm.controls.questions as FormArray)
          .value.length;
        let i = 0;
        for (const question of (
          this.questionnaireForm.controls.questions as FormArray
        ).value) {
          const createQuestionRequest: QuestionnaireQuestionRequest = {
            question: {
              name: question.nameControl,
              possibleAnswer: question.possibleAnswersControl,
            },
          };
          if (!isNil(response)) {
            this.questionnaireService
              .createQuestionnaireQuestion(createQuestionRequest, response.Name)
              .subscribe((resp) => {
                i++;
                if (i === last) {
                  this.resetQuestionnaire();
                  this.router.navigate(['./dashboard/dashboard-list']);
                }
              });
          }
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewQuestionnaireDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data === DialogResult.YES) {
        this.createQuestionnaire();
      }
    });
  }
}

@Component({
  selector: 'app-new-questionnaire-dialog',
  templateUrl: 'new-questionnaire-dialog.component.html',
})
export class NewQuestionnaireDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewQuestionnaireDialogComponent>
  ) {}

  back(): void {
    this.dialogRef.close({ data: DialogResult.NO });
  }

  yes(): void {
    this.dialogRef.close({ data: DialogResult.YES });
  }
}
