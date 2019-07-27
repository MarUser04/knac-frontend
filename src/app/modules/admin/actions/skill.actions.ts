import { Action } from '@ngrx/store';
import { Skill } from '../models/skill';

export enum SkillsActionTypes {
  GetSkills = '[Admin] GET Current Skills',
  SetSkills = '[Admin] SET Current Skills',
  CreateSkill = '[Admin] CREATE Current Skills',
  UpdateSkill = '[Admin] PUT Current Skills',
  DeleteSkill = '[Admin] Delete Current Skills'
}

export class SetSkills implements Action {
  readonly type = SkillsActionTypes.SetSkills;

  constructor(public payload: Skill[]) {}
}

export class UpdateSkill implements Action {
  readonly type = SkillsActionTypes.UpdateSkill;

  constructor(public payload: Skill) {}
}

export class CreateSkill implements Action {
  readonly type = SkillsActionTypes.CreateSkill;

  constructor(public payload: any) {}
}

export class GetSkills implements Action {
  readonly type = SkillsActionTypes.GetSkills;
}

export class DeleteSkill implements Action {
  readonly type = SkillsActionTypes.DeleteSkill;

  constructor(public payload: any) {}
}

export type SkillsActionsUnion =
  | SetSkills
  | GetSkills
  | CreateSkill
  | UpdateSkill
  | DeleteSkill;
