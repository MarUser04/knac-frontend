import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Company } from '../models/company';
import { CompanyActionTypes, CompanyActionsUnion } from '../actions/company.actions';

export interface State {}

export const initialState: State = [];

export function reducer(
  state = initialState,
  action: CompanyActionsUnion
): State {
  switch (action.type) {
    case CompanyActionTypes.SetCompanies: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
