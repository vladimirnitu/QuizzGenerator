import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const loginUser = createAction(
  '[Shared] Login User',
  props<{ loggedUser: User }>(),
);

export const logoutUser = createAction(
  '[Shared] Logout User',
);
