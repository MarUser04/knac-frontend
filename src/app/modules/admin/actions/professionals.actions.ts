import { Action } from '@ngrx/store';

export enum ProfessionalsActionTypes {
  GetProfessionals = '[admin] GET Professional List',
  SetProfessionals = '[admin] SET Professional List',
  SearchProfessionalsAdmin = '[admin] SEARCH Professional',
  GetProfessional = '[admin] GET Professional profile',
  SetProfessional = '[admin] SET Professional profile'
}

export class GetProfessionals implements Action {
  readonly type = ProfessionalsActionTypes.GetProfessionals;
}

export class SetProfessionals implements Action {
  readonly type = ProfessionalsActionTypes.SetProfessionals;

  constructor(public payload: any) {}
}

export class GetProfessional implements Action {
  readonly type = ProfessionalsActionTypes.GetProfessional;

  constructor(public payload: string) {}
}

export class SetProfessional implements Action {
  readonly type = ProfessionalsActionTypes.SetProfessional;

  constructor(public payload: any) {}
}

export class SearchProfessionalsAdmin implements Action {
  readonly type = ProfessionalsActionTypes.SearchProfessionalsAdmin;
  constructor(public payload: any) {}
}

export type ProfessionalListActionUnion =
  | GetProfessionals
  | SetProfessionals
  | GetProfessional
  | SetProfessional
  | SearchProfessionalsAdmin;
