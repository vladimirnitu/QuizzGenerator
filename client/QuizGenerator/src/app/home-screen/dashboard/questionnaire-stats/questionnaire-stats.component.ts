import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../../../shared/services/questionnaire.service';
import { QuestionnaireStatistics } from '../../../shared/requests/questionnaire.request';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-questionnaire-stats',
  templateUrl: './questionnaire-stats.component.html',
  styleUrls: ['./questionnaire-stats.component.scss'],
})
export class QuestionnaireStatsComponent implements OnInit {
  idNumber = '';
  genderStatistics = [
    {
      name: 'Male',
      value: 0,
    },
    {
      name: 'Female',
      value: 0,
    },
    {
      name: 'Other',
      value: 0,
    },
  ];

  ageStatistics = [
    {
      name: '0-18',
      value: 0,
    },
    {
      name: '19-30',
      value: 0,
    },
    {
      name: '31-45',
      value: 0,
    },
    {
      name: '45+',
      value: 0,
    },
  ];

  urbanismStatistics = [
    {
      name: 'Urban',
      value: 0,
    },
    {
      name: 'Rural',
      value: 0,
    },
    {
      name: 'Other',
      value: 0,
    },
  ];

  occupationStatistics = [];

  questionnaireQuestions = [];
  showResponses = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit(): void {
    this.idNumber = this.route.snapshot.paramMap.get('questionnaireID');
    this.questionnaireService
      .getQuestionnaireStatsByCode(this.idNumber)
      .subscribe((response) => {
        response.Sex.forEach((sex) => {
          const key = Object.keys(sex)[0];
          if (this.genderStatistics.findIndex((el) => el.name === key) !== -1) {
            this.genderStatistics.find(
              (element) => element.name === key
            ).value = sex[key];
          }
        });

        response.GroupAge.forEach((age) => {
          const key = Object.keys(age)[0];
          if (this.ageStatistics.findIndex((el) => el.name === key) !== -1) {
            this.ageStatistics.find((element) => element.name === key).value =
              age[key];
          }
        });

        let otherUrbanism = 0;
        response.Urbanism.forEach((urban) => {
          const key = Object.keys(urban)[0];
          if (
            this.urbanismStatistics.findIndex((el) => el.name === key) === -1
          ) {
            otherUrbanism++;
          } else {
            this.urbanismStatistics.find(
              (element) => element.name === key
            ).value = urban[key];
          }
        });
        this.urbanismStatistics.find((el) => el.name === 'Other').value +=
          otherUrbanism;

        response.Occupation.forEach((occupation) => {
          const key = Object.keys(occupation)[0];
          this.occupationStatistics.push({
            name: key.replace(/./, (c) => c.toUpperCase()),
            value: occupation[key],
          });
        });
      });
    this.questionnaireService
      .getQuestionsOfQuestionnaireByCode(this.idNumber)
      .subscribe((response) => {
        this.questionnaireQuestions = response;
        this.questionnaireQuestions.forEach((q) => {
          q.answers = [];
          this.questionnaireService
            .getQuestionnaireQuestionAnswers(this.idNumber, q._id)
            .subscribe((resp) => {
              q.answers = resp;
            });
        });
        console.log(this.questionnaireQuestions);
      });
  }

  isValidUrbanism(): boolean {
    return (
      this.urbanismStatistics.findIndex((element) => element.value > 0) !== -1
    );
  }

  isValidAge(): boolean {
    return this.ageStatistics.findIndex((element) => element.value > 0) !== -1;
  }
  isValidGender(): boolean {
    return (
      this.genderStatistics.findIndex((element) => element.value > 0) !== -1
    );
  }
}
