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
  static getQuestionsOfQuestionnaireByCode = baseUrl + '/questions/';
  static createAnswer = baseUrl + '/answer/create';
  static deleteQuestionnaire = baseUrl + '/questionary/';
}

export enum errorResults {
  REQUEST_TIMEOUT = 'Request timeout',
}
