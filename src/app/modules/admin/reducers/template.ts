import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  TemplateActionTypes,
  TemplateActionsUnion
} from '../actions/template.actions';

export interface State {}

export const initialState: State = [];

export function reducer(
  state = initialState,
  action: TemplateActionsUnion
): State {
  switch (action.type) {
    case TemplateActionTypes.SetTemplates: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
