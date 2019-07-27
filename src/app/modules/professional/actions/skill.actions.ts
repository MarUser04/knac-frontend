import { Action } from '@ngrx/store';
import { Skill } from '../models/skill';

export enum SkillsActionTypes {
  GetSkills = '[Professional] GET Current Skills',
  SetSkills = '[Professional] SET Current Skills',
}

export class SetSkills implements Action {
  readonly type = SkillsActionTypes.SetSkills;

  constructor(public payload: Skill[]) {}
}

export class GetSkills implements Action {
  readonly type = SkillsActionTypes.GetSkills;
}

export type SkillsActionsUnion =
  | SetSkills
  | GetSkills;
