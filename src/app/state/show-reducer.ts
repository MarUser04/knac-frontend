import { createSelector } from '@ngrx/store';

import { AppActionTypes, AppActionsUnion } from './app-actions';

export const initialState = false;

export function showReducer(
  state = initialState,
  action: AppActionsUnion
): boolean {
  switch (action.type) {
    case AppActionTypes.ShowFullPreloading: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
