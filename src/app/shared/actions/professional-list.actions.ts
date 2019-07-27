import { Action } from '@ngrx/store';
import { Professional } from '../models/professional';

export enum ProfessionalListActionTypes {
  GetList = '[Professional] GET Professional List',
  SetList = '[Professional] SET Professional List',
  SearchProfessional = '[Professional] SEARCH Professional'
}

export class GetList implements Action {
  readonly type = ProfessionalListActionTypes.GetList;
}

export class SetList implements Action {
  readonly type = ProfessionalListActionTypes.SetList;

  constructor(public payload: any) {}
}

export class SearchProfessional implements Action {
  readonly type = ProfessionalListActionTypes.SearchProfessional;
  constructor(public payload: any) {}
}

export type ProfessionalListActionUnion =
  | GetList
  | SetList
  | SearchProfessional;
