export class LoginRequest {
  username?: string;
  password: string;
  email?: string;
}

export enum LoginRequestResponses {
  BAD_CREDENTIALS = 'Bad credentials',
}
