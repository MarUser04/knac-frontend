import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  SkillsActionTypes,
  SkillsActionsUnion
} from '../actions/skill.actions';

export interface State {}

export const initialState: State = [];

export function reducer(
  state = initialState,
  action: SkillsActionsUnion
): State {
  switch (action.type) {
    case SkillsActionTypes.SetSkills: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
