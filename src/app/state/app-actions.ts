import { Action } from '@ngrx/store';

export enum AppActionTypes {
  AppError            = '[App] Update Error',
  Logout              = '[App] LogOut',
  ShowFullPreloading  = '[App] Show Full Preloading'
}

export class AppError implements Action {
  readonly type = AppActionTypes.AppError;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AppActionTypes.Logout;
}

export class ShowFullPreloading implements Action {
  readonly type = AppActionTypes.ShowFullPreloading;

  constructor(public payload: boolean) {}
}

export type AppActionsUnion =
  | Logout
  | AppError
  | ShowFullPreloading;
