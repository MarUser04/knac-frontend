import { Action } from '@ngrx/store';
import { Job } from '@app/modules/professional/models/job';

export enum JobActionTypes {
  GetJobs = '[Professional] GET professional jobs',
  GetJobsApplied = '[Professional] GET Jobs professional has applied',
  GetJobByID = '[Professional] GET professional job by ID',
  SetJobs = '[Professional] SET professional jobs',
  SetJobsIDs = '[Professional] SET professional jobs IDs',
  SetJobByID = '[Professional] SET professional job by ID',
  SearchJob = '[Professional] SEARCH Job',
  FilterJob = '[Professional] FILTER Job',
  ApplyJobByID = '[Professional] Apply for Job',
  SetJobsApplied = '[Professional] Set Applied Jobs',
  ApplyPendingProcessingJob = '[Professional] Apply job'
}

export class GetJobs implements Action {
  readonly type = JobActionTypes.GetJobs;
}

export class GetJobsApplied implements Action {
  readonly type = JobActionTypes.GetJobsApplied;
}

export class SetJobsApplied implements Action {
  readonly type = JobActionTypes.SetJobsApplied;
}

export class GetJobByID implements Action {
  readonly type = JobActionTypes.GetJobByID;
  constructor(public payload: any) {}
}

export class SetJobs implements Action {
  readonly type = JobActionTypes.SetJobs;
  constructor(public payload: Job[]) {}
}

export class SetJobsIDs implements Action {
  readonly type = JobActionTypes.SetJobsIDs;
  constructor(public payload: string[]) {}
}

export class SetJobByID implements Action {
  readonly type = JobActionTypes.SetJobByID;
  constructor(public payload: Job) {}
}

export class SearchJob implements Action {
  readonly type = JobActionTypes.SearchJob;
  constructor(public payload: string) {}
}

export class FilterJob implements Action {
  readonly type = JobActionTypes.FilterJob;
  constructor(public payload: string) {}
}

export class ApplyJobByID implements Action {
  readonly type = JobActionTypes.ApplyJobByID;
  constructor(public payload: string) {}
}

export class ApplyPendingProcessingJob implements Action {
  readonly type = JobActionTypes.ApplyPendingProcessingJob;
}

export type JobActionsUnion =
  | GetJobs
  | GetJobsApplied
  | GetJobByID
  | SetJobs
  | SetJobsApplied
  | SetJobByID
  | SetJobsIDs
  | SearchJob
  | FilterJob
  | ApplyJobByID
  | ApplyPendingProcessingJob;
