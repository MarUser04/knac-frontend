import { Action } from '@ngrx/store';
import { Template } from '@app/modules/admin/models/template';

export enum TemplateActionTypes {
  GetTemplates = '[Admin] GET Current Template',
  SetTemplates = '[Admin] SET Current Template',
  CreateTemplate = '[Admin] CREATE Current Template',
  UpdateTemplate = '[Admin] PUT Current Template',
  DeleteTemplate = '[Admin] Delete Current Template'
}

export class SetTemplates implements Action {
  readonly type = TemplateActionTypes.SetTemplates;

  constructor(public payload: Template[]) {}
}

export class UpdateTemplate implements Action {
  readonly type = TemplateActionTypes.UpdateTemplate;

  constructor(public payload: Template) {}
}

export class CreateTemplate implements Action {
  readonly type = TemplateActionTypes.CreateTemplate;

  constructor(public payload: Template) {}
}

export class GetTemplates implements Action {
  readonly type = TemplateActionTypes.GetTemplates;
}

export class DeleteTemplate implements Action {
  readonly type = TemplateActionTypes.DeleteTemplate;

  constructor(public payload: any) {}
}

export type TemplateActionsUnion =
  | SetTemplates
  | GetTemplates
  | CreateTemplate
  | UpdateTemplate
  | DeleteTemplate;
