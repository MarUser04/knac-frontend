import { Action } from '@ngrx/store';

export enum AdminActionTypes {
  Pending = '[Admin] Pending Form',
  Loading = '[Admin] Loading Form',
  ModalCreateToggle = '[Admin] ModalCreateToggle Form',
  ModalUpdateToggle = '[Admin] ModalUpdateToggle Form'
}

// Full Spinner
export class Pending implements Action {
  readonly type = AdminActionTypes.Pending;
}

// Simple Spinner
export class Loading implements Action {
  readonly type = AdminActionTypes.Loading;
}

export class ModalCreateToggle implements Action {
  readonly type = AdminActionTypes.ModalCreateToggle;
}

export class ModalUpdateToggle implements Action {
  readonly type = AdminActionTypes.ModalUpdateToggle;
}

export type AdminActionsUnion =
  | Pending
  | Loading
  | ModalCreateToggle
  | ModalUpdateToggle;
