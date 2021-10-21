import { User } from '../models/user';

export interface SharedState {
  isUserLogged: boolean;
  loggedUser?: User;
}
