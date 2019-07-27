import { createSelector } from '@ngrx/store';
import { AdminActionTypes, AdminActionsUnion } from '../actions/page.actions';

export interface State {}

export const initialState = false;

export function reducer(
  state = initialState,
  action: AdminActionsUnion
): boolean {
  switch (action.type) {

    case AdminActionTypes.Loading: {
      return !state;
    }

    default: {
      return state;
    }
  }
}
