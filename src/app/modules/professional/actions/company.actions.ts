import { Action } from '@ngrx/store';
import { Assessment } from '@app/shared/models/assessment';

export enum CompanyActionTypes {
  GetCompanies = '[Professional] GET professional Companies',
  SetCompanies = '[Professional] SET professional Companies',
  GetCompany = '[Professional] GET professional Company',
  SetCompany = '[Professional] SET professional Company',
  SearchCompany = '[Professional] SEARCH Professional Company',
  SetCompanyName = '[Professional] SET Company name'
}

export class GetCompanies implements Action {
  readonly type = CompanyActionTypes.GetCompanies;
}

export class SetCompanies implements Action {
  readonly type = CompanyActionTypes.SetCompanies;

  constructor(public payload: any) {}
}

export class GetCompany implements Action {
  readonly type = CompanyActionTypes.GetCompany;

  constructor(public payload: any) {}
}

export class SetCompany implements Action {
  readonly type = CompanyActionTypes.SetCompany;

  constructor(public payload: any) {}
}

export class SearchCompany implements Action {
  readonly type = CompanyActionTypes.SearchCompany;
  constructor(public payload: string) {}
}

export class SetCompanyName implements Action {
  readonly type = CompanyActionTypes.SetCompanyName;

  constructor(public payload: string) {}
}

export type CompanyActionsUnion =
  | GetCompanies
  | SetCompanies
  | GetCompany
  | SetCompany
  | SetCompanyName
  | SearchCompany;
