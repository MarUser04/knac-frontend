import { createSelector } from '@ngrx/store';
import { Company } from '../models/company';
import { AdminActionTypes, AdminActionsUnion } from '../actions/page.actions';

export interface State {}

export const initialState = false;

export function reducer(
  state = initialState,
  action: AdminActionsUnion
): boolean {
  switch (action.type) {
    case AdminActionTypes.ModalCreateToggle: {
      return !state;
    }

    default: {
      return state;
    }
  }
}
