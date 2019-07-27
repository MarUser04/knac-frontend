import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Professional } from '../models/professional';
import { ProfessionalListActionTypes, ProfessionalListActionUnion } from '../actions/professional-list.actions';

export interface State {}

export const initialState: State = [];

export function reducer(
  state = initialState,
  action: ProfessionalListActionUnion
): State {
  switch (action.type) {
    case ProfessionalListActionTypes.SetList: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
