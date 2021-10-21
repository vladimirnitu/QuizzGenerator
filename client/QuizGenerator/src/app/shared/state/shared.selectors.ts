import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

const getSharedState = createFeatureSelector<SharedState>('shared');

export const isUserLogged = createSelector(
  getSharedState,
  (state) => state.isUserLogged
);

export const getLoggedUser = createSelector(
  getSharedState,
  (state) => state.loggedUser
);
