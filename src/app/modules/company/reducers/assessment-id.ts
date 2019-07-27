import { createSelector } from '@ngrx/store';
import {
  AssessmentActionTypes,
  AssessmentActionsUnion
} from '../actions/assessments.actions';

export interface State {}

export const initialState: State = {};

export function reducer(
  state = initialState,
  action: AssessmentActionsUnion
): State {
  switch (action.type) {
    case AssessmentActionTypes.GetCompanyAssessmentByID: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
