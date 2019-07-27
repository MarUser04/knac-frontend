import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ProfessionalListActionUnion,
  ProfessionalsActionTypes
} from '../actions/professionals.actions';

export interface State {
  professionals: any;
  professional: any;
}

export const initialState: State = {
  professionals: [],
  professional: {}
};

export function reducer(
  state = initialState,
  action: ProfessionalListActionUnion
): State {
  switch (action.type) {

    case ProfessionalsActionTypes.SetProfessionals: {
      return {
        ...state,
        professionals: action.payload
      };
    }

    case ProfessionalsActionTypes.SetProfessional: {
      return {
        ...state,
        professional: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
