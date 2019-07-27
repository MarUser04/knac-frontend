import { Action } from '@ngrx/store';
import { Company } from '../models/company';

export enum CompanyActionTypes {
  GetCompanies    = '[Admin] GET Current Companies',
  SetCompany      = '[Admin] SET Current Company',
  SetCompanies    = '[Admin] SET Current Companies',
  UpdateCompany   = '[Admin] PUT Current Company',
  CreateCompanyManually = '[Admin] POST Create Company Manually',
  CreateCompany   = '[Admin] Create Company',
  DeleteCompany   = '[Admin] Delete Company'
}

export class SetCompany implements Action {
  readonly type = CompanyActionTypes.SetCompany;

  constructor(public payload: any) {}
}

export class SetCompanies implements Action {
  readonly type = CompanyActionTypes.SetCompanies;

  constructor(public payload: any) {}
}

export class GetCompanies implements Action {
  readonly type = CompanyActionTypes.GetCompanies;
}

export class UpdateCompany implements Action {
  readonly type = CompanyActionTypes.UpdateCompany;

  constructor(public payload: any) {}
}

export class CreateCompany implements Action {
  readonly type = CompanyActionTypes.CreateCompany;

  constructor(public payload: any) {}
}

export class CreateCompanyManually implements Action {
  readonly type = CompanyActionTypes.CreateCompanyManually;

  constructor(public payload: any) {}
}

export class DeleteCompany implements Action {
  readonly type = CompanyActionTypes.DeleteCompany;

  constructor(public payload: any) {}
}

export type CompanyActionsUnion =
| SetCompany
| SetCompanies
| UpdateCompany
| CreateCompany
| DeleteCompany
| CreateCompanyManually;
