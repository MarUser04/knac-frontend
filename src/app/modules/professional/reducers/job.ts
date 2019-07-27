import { JobActionTypes, JobActionsUnion } from '../actions/jobs.actions';
import { Job } from '@app/modules/professional/models/job';

export interface State {
  jobs: Job[];
  job: Job;
  jobsIDs: string[];
  ApplyPendingProcessingJob: boolean;
}

export const initialState: State = {
  jobs: [],
  job: {},
  jobsIDs: [],
  ApplyPendingProcessingJob: false,
};

export function reducer(state = initialState, action: JobActionsUnion): State {
  switch (action.type) {
    case JobActionTypes.SetJobsIDs: {
      return {
        ...state,
        jobsIDs: action.payload
      };
    }

    case JobActionTypes.SetJobs: {
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

    case JobActionTypes.ApplyPendingProcessingJob: {
      return {
        ...state,
        ApplyPendingProcessingJob: !state.ApplyPendingProcessingJob
      };
    }

    default: {
      return state;
    }
  }
}
