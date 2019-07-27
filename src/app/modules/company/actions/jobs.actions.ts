import { Action } from '@ngrx/store';
import { Job } from '@app/modules/company/models/job';

export enum JobActionTypes {
  GetJobs = '[Company] GET company jobs',
  GetJobByID = '[Company] GET company job by ID',
  SetJob = '[Company] SET company job',
  SetJobByID = '[Company] SET company job by ID',
  JobsTogglePending = '[Company] Pending job',
  PostJob = '[Company] POST company job',
  UpdateJob = '[Company] PUT company job',
  DeleteJobByID = '[Company] delete company job',
  JobModalToggle = '[Company] Modal job toggle'
}

export class GetJobs implements Action {
  readonly type = JobActionTypes.GetJobs;
}

export class GetJobByID implements Action {
  readonly type = JobActionTypes.GetJobByID;
  constructor(public payload: any) {}
}

export class SetJob implements Action {
  readonly type = JobActionTypes.SetJob;
  constructor(public payload: Job[]) {}
}

export class SetJobByID implements Action {
  readonly type = JobActionTypes.SetJobByID;
  constructor(public payload: Job) {}
}

export class JobsTogglePending implements Action {
  readonly type = JobActionTypes.JobsTogglePending;
}

export class PostJob implements Action {
  readonly type = JobActionTypes.PostJob;

  constructor(public payload: Job) {}
}

export class UpdateJob implements Action {
  readonly type = JobActionTypes.UpdateJob;

  constructor(public payload: any) {}
}

export class DeleteJobByID implements Action {
  readonly type = JobActionTypes.DeleteJobByID;

  constructor(public payload: string) {}
}

export class JobModalToggle implements Action {
  readonly type = JobActionTypes.JobModalToggle;
}

export type JobActionsUnion =
  | GetJobs
  | GetJobByID
  | SetJob
  | SetJobByID
  | PostJob
  | UpdateJob
  | JobsTogglePending
  | DeleteJobByID
  | JobModalToggle;
