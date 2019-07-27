import { Action } from '@ngrx/store';

export enum AdminActionTypes {
  UpdatePassword = '[Admin] POST Update password',
  DisableEnableUsers = '[Admin] POST Disable or enable users',
  DeleteCompanyById = '[Admin] DELETE Company by id'
}

export const PROFESSIONAL = 'PROFESSIONAL';

export const COMPANY = 'COMPANY';

export class UpdatePassword implements Action {
  readonly type = AdminActionTypes.UpdatePassword;

  constructor(public payload: any) {}
}

export class DisableEnableUsers implements Action {
  readonly type = AdminActionTypes.DisableEnableUsers;

  constructor(public payload: any) {}
}

export class DeleteCompanyById implements Action {
  readonly type = AdminActionTypes.DeleteCompanyById;

  constructor(public payload: any) {}
}

export type AdminActionsUnion =
  | UpdatePassword
  | DisableEnableUsers
  | DeleteCompanyById;
