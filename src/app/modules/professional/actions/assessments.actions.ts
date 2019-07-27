import { Action } from '@ngrx/store';
import { Assessment } from '@app/shared/models/assessment';

export enum AssessmentActionTypes {
  GetAssessments = '[Professional] GET professional Assessments',
  GetAssessment = '[Professional] GET professional Assessment',
  GetCompletedAssessments = '[Professional] GET Completed Assessments by ID',
  SetAssessments = '[Professional] SET professional Assessments',
  SetAssessment = '[Professional] SET professional Assessment',
  SetCompletedAssessments = '[Professional] SET Completed Assessments by ID',
  GetTemplate = '[Professional] GET professional Template',
  TakeAssessment = '[Professional] TAKE professional Assessment',
  TogglePendingProcessingAssessment = '[Professional] Pending Assessment',
  TakingPendingProcessingAssessment = '[Professional] Taking Assessment',
  SubmitAssessment = '[Professional] SUBMIT professional Assessment',
  GetFeedbackByAssessment = '[Professional] GET Feedback Assessment by ID',
  SetFeedbackByAssessment = '[Professional] SET Feedback Assessment by ID',
  GetQuestions = '[Professional] GET Current Questions',
  SetQuestions = '[Professional] SET Current Questions'
}

export class GetTemplate implements Action {
  readonly type = AssessmentActionTypes.GetTemplate;
}

export class GetAssessments implements Action {
  readonly type = AssessmentActionTypes.GetAssessments;
}

export class GetAssessment implements Action {
  readonly type = AssessmentActionTypes.GetAssessment;
}

export class GetCompletedAssessments implements Action {
  readonly type = AssessmentActionTypes.GetCompletedAssessments;
}

export class SetAssessments implements Action {
  readonly type = AssessmentActionTypes.SetAssessments;

  constructor(public payload: Assessment[]) {}
}

export class SetAssessment implements Action {
  readonly type = AssessmentActionTypes.SetAssessment;

  constructor(public payload: any) {}
}

export class SetCompletedAssessments implements Action {
  readonly type = AssessmentActionTypes.SetCompletedAssessments;

  constructor(public payload: string[]) {}
}

export class TakeAssessment implements Action {
  readonly type = AssessmentActionTypes.TakeAssessment;

  constructor(public payload: string) {}
}

export class TogglePendingProcessingAssessment implements Action {
  readonly type = AssessmentActionTypes.TogglePendingProcessingAssessment;
}

export class TakingPendingProcessingAssessment implements Action {
  readonly type = AssessmentActionTypes.TakingPendingProcessingAssessment;
}

export class SubmitAssessment implements Action {
  readonly type = AssessmentActionTypes.SubmitAssessment;

  constructor(public payload: any) {}
}

export class GetFeedbackByAssessment implements Action {
  readonly type = AssessmentActionTypes.GetFeedbackByAssessment;

  constructor(public payload: any) {}
}

export class SetFeedbackByAssessment implements Action {
  readonly type = AssessmentActionTypes.SetFeedbackByAssessment;

  constructor(public payload: any) {}
}

export class SetQuestions implements Action {
  readonly type = AssessmentActionTypes.SetQuestions;

  constructor(public payload: any) {}
}

export class GetQuestions implements Action {
  readonly type = AssessmentActionTypes.GetQuestions;
}

export type AssessmentActionsUnion =
  | GetAssessments
  | GetAssessment
  | GetCompletedAssessments
  | GetTemplate
  | SetAssessments
  | SetAssessment
  | SetCompletedAssessments
  | TakeAssessment
  | TogglePendingProcessingAssessment
  | TakingPendingProcessingAssessment
  | SubmitAssessment
  | GetFeedbackByAssessment
  | SetFeedbackByAssessment
  | SetQuestions
  | GetQuestions;
