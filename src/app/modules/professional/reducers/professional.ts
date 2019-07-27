import { createSelector } from '@ngrx/store';
import {
  ProfessionalActionTypes,
  ProfessionalActionsUnion
} from '../actions/professional.actions';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false
};

export function reducer(
  state = initialState,
  action: ProfessionalActionsUnion
): State {
  switch (action.type) {
    case ProfessionalActionTypes.PendingUpdatePassword: {
      return { pending: !state.pending };
    }

    default: {
      return state;
    }
  }
}
