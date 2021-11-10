export const baseUrl = 'http://localhost:3000';

// tslint:disable-next-line:class-name
export class config {
  static loginUrl = baseUrl + '/login/user';
  static registerUrl = baseUrl + '/register/user';
  static categoriesUrl = baseUrl + '/category/all';
  static createQuestionnaire = baseUrl + '/questionary/create/';
  static createQuestion = baseUrl + '/questions/create/';
}
