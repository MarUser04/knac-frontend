import { Action } from '@ngrx/store';

export enum SiteActionTypes {
  CreateProfile = '[Company] CREATE Current Profile',
  TogglePending = '[Company] Toggle Pending',
}

export class CreateProfile implements Action {
  readonly type = SiteActionTypes.CreateProfile;

  constructor(public payload: any) {}
}

export class TogglePending implements Action {
  readonly type = SiteActionTypes.TogglePending;
}

export type SiteActionsUnion =
  | CreateProfile
  | TogglePending;
