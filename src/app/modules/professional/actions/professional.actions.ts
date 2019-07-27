import { Action } from '@ngrx/store';

export enum ProfessionalActionTypes {
  UpdatePasswordProfessional = '[Professional] POST Update password',
  PendingUpdatePassword = '[Professional] Pending Update password'
}

export class UpdatePasswordProfessional implements Action {
  readonly type = ProfessionalActionTypes.UpdatePasswordProfessional;

  constructor(public payload: any) {}
}

export class PendingUpdatePassword implements Action {
  readonly type = ProfessionalActionTypes.PendingUpdatePassword;
}

export type ProfessionalActionsUnion =
  | UpdatePasswordProfessional
  | PendingUpdatePassword;
