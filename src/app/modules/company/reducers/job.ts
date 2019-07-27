import { createSelector } from '@ngrx/store';
import { JobActionTypes, JobActionsUnion } from '../actions/jobs.actions';
import { Job } from '@app/modules/company/models/job';

export interface State {
  JobsTogglePending: boolean;
  jobs: Job[];
  job: Job;
}

export const initialState: State = {
  JobsTogglePending: false,
  jobs: [],
  job: {}
};

export function reducer(state = initialState, action: JobActionsUnion): State {
  switch (action.type) {
    case JobActionTypes.SetJob: {
      return {
        ...state,
        jobs: action.payload
      };
    }
    case JobActionTypes.SetJobByID: {
      return {
        ...state,
        job: action.payload
      };
    }
    case JobActionTypes.JobsTogglePending: {
      return {
        ...state,
        JobsTogglePending: !state.JobsTogglePending
      };
    }
    default: {
      return state;
    }
  }
}
