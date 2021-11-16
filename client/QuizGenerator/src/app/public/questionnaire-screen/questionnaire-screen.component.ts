import { Component, OnInit } from '@angular/core';
import * as fromShared from '../../shared/state/shared.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../shared/app.state';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../shared/models/user';
import {
  AnswerForQuestionnaire,
  QuestionnaireQuestionRequest,
  QuestionnaireQuestionRequestResponse,
  QuestionnaireRequest,
  QuestionnaireRequestResponse,
} from '../../shared/requests/questionnaire.request';
import { QuestionnaireService } from '../../shared/services/questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { castTo } from '../../shared/helpers/castTo';

@Component({
  selector: 'app-questionnaire-screen',
  templateUrl: './questionnaire-screen.component.html',
  styleUrls: ['./questionnaire-screen.component.scss'],
})
export class QuestionnaireScreenComponent implements OnInit {
  $castToFormArray = castTo<FormArray>();
  $castToFormControl = castTo<FormControl>();
  currentUser: User;

  idNumber: string;
  sexOptions = ['Male', 'Female', 'Other'];
  ageGroupOptions = ['0-18', '19-30', '31-45', '45+'];
  urbanismOptions = ['Urban', 'Rural', 'Other'];

  questionnaire: QuestionnaireRequestResponse;
  questions: QuestionnaireQuestionRequestResponse[];

  questionnaireForm: FormGroup = new FormGroup({});
  questionsAnswers = new FormArray([], Validators.required);
  sex = new FormControl('', Validators.required);
  ageGroup = new FormControl('', Validators.required);
  occupation = new FormControl('', Validators.required);
  urbanism = new FormControl('', Validators.required);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit(): void {
    this.idNumber = this.route.snapshot.paramMap.get('questionnaireID');
    this.questionnaireService
      .getQuestionnaireByCode(this.idNumber)
      .subscribe((response) => {
        this.questionnaire = response;
      });
    this.questionnaireService
      .getQuestionsOfQuestionnaireByCode(this.idNumber)
      .subscribe((response) => {
        this.questions = response.reverse();
        this.questions.forEach((_) => {
          this.questionsAnswers.push(new FormControl('', Validators.required));
        });
      });

    this.questionnaireForm = this.formBuilder.group({
      answers: this.questionsAnswers,
      sex: this.sex,
      ageGroup: this.ageGroup,
      occupation: this.occupation,
      urbanism: this.urbanism,
    });
  }

  answerQuestionnaire(): void {
    const createAnswers: {
      questionName: string;
      answer: string;
      questionId: string;
    }[] = [];
    this.questionsAnswers.value.forEach((qAnswer: string, index) => {
      createAnswers.push({
        questionName: this.questions[index].Name,
        answer: qAnswer,
        questionId: this.questions[index]._id,
      });
    });

    const createAnswerRequest: AnswerForQuestionnaire = {
      questionaryName: this.questionnaire.Name,
      answers: createAnswers,
      sex: this.sex.value,
      groupAge: this.ageGroup.value,
      occupation: this.occupation.value,
      urbanism: this.urbanism.value,
    };

    this.questionnaireService
      .createAnswer(createAnswerRequest)
      .subscribe((_) => {
        this.router.navigate(['./home']);
      });
  }
}
