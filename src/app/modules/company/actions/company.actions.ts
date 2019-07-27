import { Action } from '@ngrx/store';
import { Company } from '../models/company';

export enum CompanyActionTypes {
  GetCompanyByID = '[Company] GET Company Profile By ID',
  GetProfile = '[Company] GET Current Profile',
  SetProfile = '[Company] SET Current Profile',
  PendingProfile = '[Company] Pending Profile',
  UpdateProfile = '[Company] Update Profile',
  UpdateError = '[Company] Update Error',
  SetupPassword = '[Company] Setup Password',
  CompanyPending = '[Company] Company Pending',
  HasSetupPassword = '[Company] User has setup password',
  HasLoadedProfile = '[Company] Profile is Loaded',
  ModalUpdateToggle = '[Company] ModalUpdateToggle company profile',
  UpdatePassword = '[Company] POST Update Password'
}

export class GetCompanyByID implements Action {
  readonly type = CompanyActionTypes.GetCompanyByID;

  constructor(public payload: any) {}
}

export class GetProfile implements Action {
  readonly type = CompanyActionTypes.GetProfile;
}

export class SetProfile implements Action {
  readonly type = CompanyActionTypes.SetProfile;

  constructor(public payload: any) {}
}

export class PendingProfile implements Action {
  readonly type = CompanyActionTypes.PendingProfile;
}

export class UpdateProfile implements Action {
  readonly type = CompanyActionTypes.UpdateProfile;

  constructor(public payload: Company) {}
}

export class SetupPassword implements Action {
  readonly type = CompanyActionTypes.SetupPassword;

  constructor(public payload: any) {}
}

export class CompanyPending implements Action {
  readonly type = CompanyActionTypes.CompanyPending;
}

export class HasSetupPassword implements Action {
  readonly type = CompanyActionTypes.HasSetupPassword;

  constructor(public payload: boolean) {}
}

export class HasLoadedProfile implements Action {
  readonly type = CompanyActionTypes.HasLoadedProfile;

  constructor(public payload: boolean) {}
}

export class UpdatePassword implements Action {
  readonly type = CompanyActionTypes.UpdatePassword;

  constructor(public payload: boolean) {}
}

export class ModalUpdateToggle implements Action {
  readonly type = CompanyActionTypes.ModalUpdateToggle;
}

export type CompanyActionsUnion =
  | GetProfile
  | UpdateProfile
  | SetProfile
  | PendingProfile
  | SetupPassword
  | CompanyPending
  | HasSetupPassword
  | HasLoadedProfile
  | ModalUpdateToggle
  | UpdatePassword;
