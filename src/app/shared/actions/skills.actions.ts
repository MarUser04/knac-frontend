import { Action } from '@ngrx/store';

export enum SkillsActionTypes {
  GetSkillsList = '[TRACK] GET SKILLS LIST',
  SetSkillsList = '[TRACK] SET SKILLS LIST'
}

export class GetSkillsList implements Action {
  readonly type = SkillsActionTypes.GetSkillsList;
}

export class SetSkillsList implements Action {
  readonly type = SkillsActionTypes.SetSkillsList;
  constructor(public payload: any) {}
}

export type SkillsActionUnion =
| GetSkillsList
| SetSkillsList;
