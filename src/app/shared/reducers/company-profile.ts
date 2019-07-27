import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Company } from '../models/company';
import {
  CompanyProfileActionTypes,
  CompanyProfileActionUnion
} from '../actions/company-profile.actions';
import { Assessment } from '@app/shared/models/assessment';

export interface State {
  company_assessment: any;
  assessment: Assessment;
  showSnackbar: boolean;
  company: any;
}

export const initialState: State = {
  company_assessment: [],
  assessment: {},
  showSnackbar: false,
  company: {}
};

export function reducer(
  state = initialState,
  action: CompanyProfileActionUnion
): State {
  switch (action.type) {
    case CompanyProfileActionTypes.SetCompany: {
      return {
        ...state,
        company: action.payload
      };
    }
    case CompanyProfileActionTypes.SetCompanyAssessments: {
      return {
        ...state,
        company_assessment: action.payload
      };
    }
    case CompanyProfileActionTypes.SetAssessmentByID: {
      return {
        ...state,
        assessment: action.payload
      };
    }
    case CompanyProfileActionTypes.ShowSnackBar: {
      return {
        ...state,
        showSnackbar: !state.showSnackbar
      };
    }
    default: {
      return state;
    }
  }
}
