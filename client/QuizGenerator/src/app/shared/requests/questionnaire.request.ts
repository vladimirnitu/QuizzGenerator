export class QuestionnaireRequest {
  username: string;
  name: string;
}

export interface QuestionnaireRequestResponse {
  Category: string;
  CategoryName: string;
  Name: string;
  Code: string;
  UserName: string;
}

export class QuestionnaireQuestionRequest {
  question: { name: string; possibleAnswer: string[] };
}

export interface QuestionnaireQuestionRequestResponse {
  Questionary: string;
  Name: string;
  PossibleAnswer: string[];
  QuestionaryName: string;
  QuestionaryCode: string;
}
