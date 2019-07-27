import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Skills } from '@app/shared/models/skills';
import { SkillsActionTypes, SkillsActionUnion } from '../actions/skills.actions';

export interface State {}

export const initialState: State = [];

export function reducer(
  state = initialState,
  action: SkillsActionUnion
): State {
  switch (action.type) {
    case SkillsActionTypes.SetSkillsList: {
      const skills = action.payload.sort((a: Skills, b: Skills) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return skills;
    }
    default: {
      return state;
    }
  }
}
