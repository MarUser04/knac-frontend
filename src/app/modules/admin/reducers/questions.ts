import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  QuestionsActionTypes,
  QuestionsActionsUnion
} from '../actions/questions.actions';

export interface State {}

export const initialState: State = {};

export function reducer(
  state = initialState,
  action: QuestionsActionsUnion
): State {
  switch (action.type) {
    case QuestionsActionTypes.SetQuestions: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
