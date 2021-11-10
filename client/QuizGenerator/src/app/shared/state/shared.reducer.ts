import { createReducer, on } from '@ngrx/store';

import * as sharedActions from './shared.actions';
import { SharedState } from './shared.state';

const initialState: SharedState = {
  isUserLogged: true,
  loggedUser: {
    Email: 'test@mail.com',
    Name: 'Gigi',
    FirstName: 'Duru',
    UserName: 'test',
  },
};

const sharedReducer = createReducer(
  initialState,
  on(sharedActions.loginUser, (state, { loggedUser }) => ({
    ...state,
    isUserLogged: true,
    loggedUser,
  })),
  on(sharedActions.logoutUser, (state) => ({
    ...state,
    isUserLogged: false,
    loggedUser: undefined,
  }))
);

export function reducer(state: any, action: any): SharedState {
  return sharedReducer(state, action);
}
