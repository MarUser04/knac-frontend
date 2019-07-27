import { Action } from '@ngrx/store';
import { Professional } from '../models/professional';

export enum PublicProfileActionTypes {
  GetProfessional = '[Professional] GET Current Professional Profile',
  GetProfessionalByID = '[Professional] GET Professional Profile By ID',
  SetProfessional = '[Professional] SET Professional Profile',
  PostPhoto = '[Professional] POST Professional profile photo',
  DeletePhoto = '[Professional] DELETE Professional profile photo',
  EditPhoto = '[Professional] PUT Professional profile photo',
  PendingProfilePhote = '[Professional] Pending profile photo',
  ModalGaleryToggle = '[Professional] ModalGaleryToggle Professional profile',
  DownloadCV = '[Professional] Download CV Professional profile',
  ShowSnackBar = '[Professional] show snackbar',
  IsProfile = '[Professional] is profile'
}

export class GetProfessional implements Action {
  readonly type = PublicProfileActionTypes.GetProfessional;
}

export class GetProfessionalByID implements Action {
  readonly type = PublicProfileActionTypes.GetProfessionalByID;

  constructor(public payload: any) {}
}

export class SetProfessional implements Action {
  readonly type = PublicProfileActionTypes.SetProfessional;

  constructor(public payload: Professional) {}
}

export class PostPhoto implements Action {
  readonly type = PublicProfileActionTypes.PostPhoto;

  constructor(public payload: any) {}
}

export class DeletePhoto implements Action {
  readonly type = PublicProfileActionTypes.DeletePhoto;

  constructor(public payload: any) {}
}

export class EditPhoto implements Action {
  readonly type = PublicProfileActionTypes.EditPhoto;

  constructor(public payload: any) {}
}

export class PendingProfilePhote implements Action {
  readonly type = PublicProfileActionTypes.PendingProfilePhote;
}

export class ModalGaleryToggle implements Action {
  readonly type = PublicProfileActionTypes.ModalGaleryToggle;
}

export class DownloadCV implements Action {
  readonly type = PublicProfileActionTypes.DownloadCV;

  constructor(public payload: any) {}
}

export class ShowSnackBar implements Action {
  readonly type = PublicProfileActionTypes.ShowSnackBar;
}

export class IsProfile implements Action {
  readonly type = PublicProfileActionTypes.IsProfile;
}

export type PublicProfileActionUnion =
  | GetProfessional
  | GetProfessionalByID
  | SetProfessional
  | PostPhoto
  | DeletePhoto
  | EditPhoto
  | PendingProfilePhote
  | ModalGaleryToggle
  | DownloadCV
  | ShowSnackBar
  | IsProfile;
