import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  QuestionsActionTypes,
  QuestionsActionsUnion
} from '../actions/questions.actions';
import { Questions } from '../models/questions';

export interface State {}

export const initialState = false;

export function reducer(
  state = initialState,
  action: QuestionsActionsUnion
): boolean {
  switch (action.type) {
    case QuestionsActionTypes.ModalFeedbackToggle: {
      return !state;
    }

    default: {
      return state;
    }
  }
}
