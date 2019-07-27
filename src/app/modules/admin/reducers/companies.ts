import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Company } from '../models/company';
import {
  CompaniesActionTypes,
  CompaniesActionsUnion
} from '../actions/companies.actions';

export interface State {
  companies: any;
  company: any;
  companyName: string;
}

export const initialState: State = {
  companies: [],
  company: {},
  companyName: ''
};

export function reducer(
  state = initialState,
  action: CompaniesActionsUnion
): State {
  switch (action.type) {
    case CompaniesActionTypes.SetCompanyList: {
      return {
        ...state,
        companies: action.payload
      };
    }

    case CompaniesActionTypes.SetCompany: {
      return {
        ...state,
        company: action.payload
      };
    }

    case CompaniesActionTypes.SetCompanyName: {
      return {
        ...state,
        companyName: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
