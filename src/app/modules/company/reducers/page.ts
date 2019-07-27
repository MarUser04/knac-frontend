import { createSelector } from '@ngrx/store';
import { Company } from '../models/company';
import {
  CompanyActionTypes,
  CompanyActionsUnion
} from '../actions/company.actions';

export interface State {}

export const initialState = false;

export function reducer(
  state = initialState,
  action: CompanyActionsUnion
): boolean {
  switch (action.type) {
    case CompanyActionTypes.CompanyPending: {
      return !state;
    }

    default: {
      return state;
    }
  }
}
