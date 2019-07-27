import { createSelector } from '@ngrx/store';
import { Company } from '../models/company';
import { CompanyActionTypes, CompanyActionsUnion } from '../actions/company.actions';

export interface State extends Company {
  pending?: boolean;
  hasSetupPassword?: boolean;
  hasLoadedProfile?: boolean;
}

export const initialState: State = {
  email: '',
  photos: [],
  videos: [],
  name: '',
  logo: '',
  phone: '',
  contactName: '',
  description: '',
  facebook: '',
  founded: '',
  industry: '',
  locations: '',
  numberOfEmployees: 0,
  twitter: '',
  pending: false,
  hasSetupPassword: false,
  hasLoadedProfile: false
};

export function reducer(
  state = initialState,
  action: CompanyActionsUnion
): State {
  switch (action.type) {
    case CompanyActionTypes.SetProfile: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CompanyActionTypes.PendingProfile: {
      return {
        ...state,
        pending: !state.pending
      };
    }

    case CompanyActionTypes.HasSetupPassword: {
      return {
        ...state,
        hasSetupPassword: action.payload
      };
    }

    case CompanyActionTypes.HasLoadedProfile: {
      return {
        ...state,
        hasLoadedProfile: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
