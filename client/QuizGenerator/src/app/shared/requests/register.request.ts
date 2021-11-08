export class RegisterRequest {
  username: string;
  password: string;
  email: string;
  name: string;
  firstName: string;
}

export class RegisterRequestResponse {
  Email: string;
  Password: string;
  Name: string;
  FirstName: string;
  UserName: string;
  Code: string;
}

export enum RegisterRequestResponses {
  ALREADY_IN_USE = 'Username or email already in use',
}
