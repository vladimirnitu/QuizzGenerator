import { ActionReducerMap } from '@ngrx/store';
import { State } from './app.state';

import {reducer as sharedReducer } from '../shared/state/shared.reducer'

export const reducers: ActionReducerMap<State> = {
  shared: sharedReducer,
};
