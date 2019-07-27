import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  CompanyActionsUnion,
  CompanyActionTypes
} from '../actions/company.actions';
import { Company } from '@app/modules/professional/models/company';

export interface State {
  companies: Company[];
  company: Company;
  companyName: string;
}

export const initialState: State = {
  companies: [],
  company: {
    assessments: [],
    jobs: []
  },
  companyName: ''
};

export function reducer(
  state = initialState,
  action: CompanyActionsUnion
): State {
  switch (action.type) {
    case CompanyActionTypes.SetCompanies: {
      return {
        ...state,
        companies: action.payload
      };
    }

    case CompanyActionTypes.SetCompany: {
      return {
        ...state,
        company: action.payload
      };
    }

    case CompanyActionTypes.SetCompanyName: {
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
