import { Action } from '@ngrx/store';
import { Questions } from '../models/questions';

export enum QuestionsActionTypes {
  GetQuestions = '[Admin] GET Current Questions',
  SetQuestions = '[Admin] SET Current Questions',
  UpdateQuestions = '[Admin] PUT Current Questions'
}

export class SetQuestions implements Action {
  readonly type = QuestionsActionTypes.SetQuestions;

  constructor(public payload: Questions) {}
}

export class UpdateQuestions implements Action {
  readonly type = QuestionsActionTypes.UpdateQuestions;

  constructor(public payload: Questions) {}
}

export class GetQuestions implements Action {
  readonly type = QuestionsActionTypes.GetQuestions;
}

export type QuestionsActionsUnion =
  | SetQuestions
  | GetQuestions
  | UpdateQuestions;
