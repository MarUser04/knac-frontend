import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SiteActionTypes, SiteActionsUnion } from '../actions/site.actions';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false,
};

export function reducer(
  state = initialState,
  action: SiteActionsUnion
): State {
  switch (action.type) {
    case SiteActionTypes.TogglePending: {
      return {
        ...state,
        pending: !state.pending
      };
    }

    default: {
      return state;
    }
  }
}
