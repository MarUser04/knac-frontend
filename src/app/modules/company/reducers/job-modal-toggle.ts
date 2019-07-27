import { createSelector } from '@ngrx/store';
import { JobActionTypes, JobActionsUnion } from '../actions/jobs.actions';

export interface State {}

export const initialState = false;

export function reducer(
  state = initialState,
  action: JobActionsUnion
): boolean {
  switch (action.type) {
    case JobActionTypes.JobModalToggle: {
      return !state;
    }

    default: {
      return state;
    }
  }
}
