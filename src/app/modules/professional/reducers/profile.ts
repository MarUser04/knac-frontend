import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Profile } from '../models/profile';
import { ProfileActionTypes, ProfileActionsUnion } from '../actions/profile.actions';

export interface State extends Profile {
  pending: boolean;
}

export const initialState: State = {
  name: '',
  email: '',
  firstName: '',
  lastName: '',
  websiteUrl: '',
  description: '',
  profilePicture: '',
  pending: false,
};

export function reducer(
  state = initialState,
  action: ProfileActionsUnion
): State {
  switch (action.type) {
    case ProfileActionTypes.SetProfile: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ProfileActionTypes.PendingProfile: {
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
