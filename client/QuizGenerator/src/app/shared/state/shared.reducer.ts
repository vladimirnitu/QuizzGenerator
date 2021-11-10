import { createReducer, on } from '@ngrx/store';

import * as sharedActions from './shared.actions';
import { SharedState } from './shared.state';

const initialState: SharedState = {
  isUserLogged: false,
  loggedUser: {
    _id: '618991468c75a243ec497d3a',
    Email: 'test5@mail.com',
    Name: 'Rosu',
    FirstName: 'Andrei',
    UserName: 'test5',
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
