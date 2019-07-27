import { Action } from '@ngrx/store';
import { Assessment } from '@app/shared/models/assessment';

export enum AssessmentActionTypes {
  CreateAssessment = '[Company] CREATE Assessments',
  GetAssessment = '[Company] GET company Assessments',
  GetCompanyAssessmentByID = '[Company] GET assessment with private data',
  GetCompanyAssessmentSubmissions = '[Company] GET assessment submissions',
  SetCompanyAssessmentSubmissions = '[Company] SET assessment submissions',
  GetTemplate = '[Company] GET company Template',
  SetTemplate = '[Company] SET company Template',
  UpdateAssessment = '[Company] Update Assessment',
  DeleteAssessmentByID = '[Company] Delete Assessment'
}

export class GetTemplate implements Action {
  readonly type = AssessmentActionTypes.GetTemplate;
}

export class SetTemplate implements Action {
  readonly type = AssessmentActionTypes.SetTemplate;
  constructor(public payload: any) {}
}

export class GetCompanyAssessmentByID implements Action {
  readonly type = AssessmentActionTypes.GetCompanyAssessmentByID;
  constructor(public payload: any) {}
}

export class GetCompanyAssessmentSubmissions implements Action {
  readonly type = AssessmentActionTypes.GetCompanyAssessmentSubmissions;
  constructor(public payload: any) {}
}

export class SetCompanyAssessmentSubmissions implements Action {
  readonly type = AssessmentActionTypes.SetCompanyAssessmentSubmissions;
  constructor(public payload: any) {}
}

export class CreateAssessments implements Action {
  readonly type = AssessmentActionTypes.CreateAssessment;
  constructor(public payload: Assessment) {}
}

export class GetAssessment implements Action {
  readonly type = AssessmentActionTypes.GetAssessment;
}

export class UpdateAssessment implements Action {
  readonly type = AssessmentActionTypes.UpdateAssessment;
  constructor(public payload: any) {}
}

export class DeleteAssessmentByID implements Action {
  readonly type = AssessmentActionTypes.DeleteAssessmentByID;
  constructor(public payload: any) {}
}

export type AssessmentActionsUnion =
  | CreateAssessments
  | GetAssessment
  | GetCompanyAssessmentByID
  | GetCompanyAssessmentSubmissions
  | SetCompanyAssessmentSubmissions
  | GetTemplate
  | SetTemplate
  | UpdateAssessment
  | DeleteAssessmentByID;
