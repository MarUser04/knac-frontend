import { createSelector } from '@ngrx/store';
import {
  AssessmentActionTypes,
  AssessmentActionsUnion
} from '../actions/assessments.actions';
import { Assessment } from '@app/shared/models/assessment';

export interface State {
  assessment: Assessment;
  assessments: Assessment[];
  completedAssessments: string[];
  feedback: any;
  questions: any;
  pendingProcessingAssessment: boolean;
  takingPendingProcessAssessment: boolean;
}

export const initialState: State = {
  assessment: {},
  assessments: [],
  completedAssessments: [],
  feedback: {},
  questions: {},
  pendingProcessingAssessment: false,
  takingPendingProcessAssessment: false
};

export function reducer(
  state = initialState,
  action: AssessmentActionsUnion
): State {
  switch (action.type) {
    case AssessmentActionTypes.SetAssessments: {
      return {
        ...state,
        assessments: action.payload
      };
    }

    case AssessmentActionTypes.SetCompletedAssessments: {
      return {
        ...state,
        completedAssessments: action.payload
      };
    }

    case AssessmentActionTypes.SetAssessment: {
      return {
        ...state,
        assessment: action.payload
      };
    }

    case AssessmentActionTypes.SetFeedbackByAssessment: {
      return {
        ...state,
        feedback: action.payload
      };
    }

    case AssessmentActionTypes.SetQuestions: {
      return {
        ...state,
        questions: action.payload
      };
    }

    case AssessmentActionTypes.TogglePendingProcessingAssessment: {
      return {
        ...state,
        pendingProcessingAssessment: !state.pendingProcessingAssessment
      };
    }

    case AssessmentActionTypes.TakingPendingProcessingAssessment: {
      return {
        ...state,
        takingPendingProcessAssessment: !state.takingPendingProcessAssessment
      };
    }

    default: {
      return state;
    }
  }
}
