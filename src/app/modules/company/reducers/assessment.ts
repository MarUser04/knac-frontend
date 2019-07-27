import { createSelector } from '@ngrx/store';
import {
  AssessmentActionTypes,
  AssessmentActionsUnion
} from '../actions/assessments.actions';

export interface State {
  templates: any;
  assessmentSubmissions: any;
}

export const initialState: State = {
  templates: [],
  assessmentSubmissions: {}
};

export function reducer(
  state = initialState,
  action: AssessmentActionsUnion
): State {
  switch (action.type) {
    case AssessmentActionTypes.SetTemplate: {
      return {
        ...state,
        templates: action.payload
      };
    }
    case AssessmentActionTypes.SetCompanyAssessmentSubmissions: {
      return {
        ...state,
        assessmentSubmissions: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
