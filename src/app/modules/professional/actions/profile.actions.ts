import { Action } from '@ngrx/store';
import { Profile } from '../models/profile';

export enum ProfileActionTypes {
  GetProfile = '[Professional] GET Current Profile',
  SetProfile = '[Professional] SET Current Profile',
  PendingProfile = '[Professional] Pending Profile',
  UpdateProfile = '[Professional] Update Profile',
  TogglePending = '[Professional] Toggle Pending',
  UpdateError = '[Professional] Update Error',
}

export class GetProfile implements Action {
  readonly type = ProfileActionTypes.GetProfile;
}

export class SetProfile implements Action {
  readonly type = ProfileActionTypes.SetProfile;

  constructor(public payload: any) {}
}

export class PendingProfile implements Action {
  readonly type = ProfileActionTypes.PendingProfile;
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UpdateProfile;

  constructor(public payload: FormData) {}
}

export class TogglePending implements Action {
  readonly type = ProfileActionTypes.TogglePending;

  constructor(public payload: boolean) {}
}

export type ProfileActionsUnion =
  | GetProfile
  | UpdateProfile
  | SetProfile
  | TogglePending
  | PendingProfile;
