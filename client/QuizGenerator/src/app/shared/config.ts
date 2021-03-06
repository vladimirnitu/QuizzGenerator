export const baseUrl = 'http://localhost:3000';

// tslint:disable-next-line:class-name
export class config {
  static loginUrl = baseUrl + '/login/user';
  static registerUrl = baseUrl + '/register/user';
  static categoriesUrl = baseUrl + '/category/all';
  static createQuestionnaire = baseUrl + '/questionary/create/';
  static createQuestion = baseUrl + '/questions/create/';
  static getAllQuestionnairesOfUser = baseUrl + '/questionaries/';
  static getQuestionnaireByCode = baseUrl + '/questionary/';
  static getStatisticsOfQuestionnaireByCode =
    baseUrl + '/questionary/get/statistics/';
  static getResponseCountOfQuestionnaireByCode =
    baseUrl + '/questionary/answer/unique/';
  static getQuestionsOfQuestionnaireByCode = baseUrl + '/questions/';
  static createAnswer = baseUrl + '/answer/create';
  static deleteQuestionnaire = baseUrl + '/questionary/';
  static getQuestionAnswers = baseUrl + '/answer/';
}

export enum errorResults {
  REQUEST_TIMEOUT = 'Request timeout',
}
