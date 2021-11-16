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
  _id: string;
  Questionary: string;
  Name: string;
  PossibleAnswer: string[];
  QuestionaryName: string;
  QuestionaryCode: string;
}

export interface AnswerForQuestionnaire {
  questionaryName: string;
  answers: { questionName: string; answer: string; questionId: string }[];
  sex: string;
  groupAge: string;
  occupation: string;
  urbanism: string;
}

export interface DeleteQuestionnaireRequest {
  code: string;
  username: string;
}
