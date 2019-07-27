import { Action } from '@ngrx/store';
import { Company } from '../models/company';
import { Assessment } from '../models/assessment';

export enum CompanyProfileActionTypes {
  GetCompanyByID = '[Company] GET Company Profile By ID',
  GetCompanyProfile = '[Company] GET Company Profile',
  SetCompany = '[Company] SET Company Profile',
  GetCompanyAssessments = '[Assessment] GET Assessments',
  SetCompanyAssessments = '[Assessment] SET Assessments',
  GetAssessmentByID = '[Assessment] GET Assessment by ID',
  SetAssessmentByID = '[Assessment] SET Assessment by ID',
  ShowSnackBar = '[Company] show snackbar'
}

export class GetCompanyByID implements Action {
  readonly type = CompanyProfileActionTypes.GetCompanyByID;

  constructor(public payload: any) {}
}

export class GetCompanyProfile implements Action {
  readonly type = CompanyProfileActionTypes.GetCompanyProfile;
}

export class SetCompany implements Action {
  readonly type = CompanyProfileActionTypes.SetCompany;

  constructor(public payload: any) {}
}

export class GetCompanyAssessments implements Action {
  readonly type = CompanyProfileActionTypes.GetCompanyAssessments;
}

export class SetCompanyAssessments implements Action {
  readonly type = CompanyProfileActionTypes.SetCompanyAssessments;

  constructor(public payload: any) {}
}

export class GetAssessmentByID implements Action {
  readonly type = CompanyProfileActionTypes.GetAssessmentByID;

  constructor(public payload: any) {}
}

export class SetAssessmentByID implements Action {
  readonly type = CompanyProfileActionTypes.SetAssessmentByID;

  constructor(public payload: any) {}
}

export class ShowSnackBar implements Action {
  readonly type = CompanyProfileActionTypes.ShowSnackBar;
}

export type CompanyProfileActionUnion =
  | GetCompanyByID
  | GetCompanyProfile
  | SetCompany
  | GetCompanyAssessments
  | SetCompanyAssessments
  | GetAssessmentByID
  | SetAssessmentByID
  | ShowSnackBar;
