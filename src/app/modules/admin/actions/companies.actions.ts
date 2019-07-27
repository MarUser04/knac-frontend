import { Action } from '@ngrx/store';
import { Company } from '../models/company';

export enum CompaniesActionTypes {
  GetCompanyList = '[Admin] GET Current Company list',
  SetCompanyList = '[Admin] SET Current Company list',
  GetCompany = '[Admin] GET Current Company profile',
  SetCompany = '[Admin] SET Current Company profile',
  SetCompanyName = '[Admin] SET Current Company name',
  UpdateEmail = '[Admin] Update Email Company',
  UpdateCompany = '[Admin] Update Current Company profile',
  SearchCompanyAdmin = '[Admin] Search Company'
}

export class GetCompanyList implements Action {
  readonly type = CompaniesActionTypes.GetCompanyList;
}

export class SetCompanyList implements Action {
  readonly type = CompaniesActionTypes.SetCompanyList;

  constructor(public payload: any) {}
}

export class GetCompany implements Action {
  readonly type = CompaniesActionTypes.GetCompany;

  constructor(public payload: string) {}
}

export class SetCompany implements Action {
  readonly type = CompaniesActionTypes.SetCompany;

  constructor(public payload: any) {}
}

export class SetCompanyName implements Action {
  readonly type = CompaniesActionTypes.SetCompanyName;

  constructor(public payload: string) {}
}

export class UpdateCompany implements Action {
  readonly type = CompaniesActionTypes.UpdateCompany;

  constructor(public payload: any) {}
}

export class UpdateEmail implements Action {
  readonly type = CompaniesActionTypes.UpdateEmail;

  constructor(public payload: any) {}
}

export class SearchCompanyAdmin implements Action {
  readonly type = CompaniesActionTypes.SearchCompanyAdmin;

  constructor(public payload: string) {}
}

export type CompaniesActionsUnion =
  | GetCompanyList
  | SetCompanyList
  | GetCompany
  | SetCompany
  | SetCompanyName
  | UpdateEmail
  | UpdateCompany
  | SearchCompanyAdmin;
