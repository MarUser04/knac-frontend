import { Professional } from '../models/professional';
import {
  PublicProfileActionTypes,
  PublicProfileActionUnion
} from '../actions/public-profile.actions';

export interface State extends Professional {
  professional: any;
  pendingProfilePhote: boolean;
  modalGaleryToggle: boolean;
  showSnackbar: boolean;
}

export const initialState: State = {
  professional: {},
  pendingProfilePhote: false,
  modalGaleryToggle: false,
  showSnackbar: false
};

export function reducer(
  state = initialState,
  action: PublicProfileActionUnion
): State {
  switch (action.type) {
    case PublicProfileActionTypes.SetProfessional: {
      return {
        ...state,
        professional: action.payload
      };
    }

    case PublicProfileActionTypes.PendingProfilePhote: {
      return {
        ...state,
        pendingProfilePhote: !state.pendingProfilePhote
      };
    }

    case PublicProfileActionTypes.ModalGaleryToggle: {
      return {
        ...state,
        modalGaleryToggle: !state.modalGaleryToggle
      };
    }

    case PublicProfileActionTypes.ShowSnackBar: {
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
