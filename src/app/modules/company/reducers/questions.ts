import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  QuestionsActionTypes,
  QuestionsActionsUnion
} from '../actions/questions.actions';
import { Questions } from '../models/questions';

export interface State {
  questions: Questions;
  pendingProcessingQuestions: boolean;
}

export const initialState: State = {
  questions: {},
  pendingProcessingQuestions: false
};

export function reducer(
  state = initialState,
  action: QuestionsActionsUnion
): State {
  switch (action.type) {
    case QuestionsActionTypes.SetQuestions: {
      return {
        ...state,
        questions: action.payload
      };
    }

    case QuestionsActionTypes.TogglePendingProcessingQuestions: {
      return {
        ...state,
        pendingProcessingQuestions: !state.pendingProcessingQuestions
      };
    }

    default: {
      return state;
    }
  }
}
