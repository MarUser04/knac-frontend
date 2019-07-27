import { Action } from '@ngrx/store';
import { Questions } from '../models/questions';

export enum QuestionsActionTypes {
  GetQuestions = '[Company] GET Current Questions',
  SetQuestions = '[Company] SET Current Questions',
  PostFeedback = '[Company] POST Feedback',
  TogglePendingProcessingQuestions = '[Company] Pending questions',
  ModalFeedbackToggle = '[Company] ModalFeedbackToggle questions'
}

export class SetQuestions implements Action {
  readonly type = QuestionsActionTypes.SetQuestions;

  constructor(public payload: Questions) {}
}

export class GetQuestions implements Action {
  readonly type = QuestionsActionTypes.GetQuestions;
}

export class PostFeedback implements Action {
  readonly type = QuestionsActionTypes.PostFeedback;

  constructor(public payload: any) {}
}

export class TogglePendingProcessingQuestions implements Action {
  readonly type = QuestionsActionTypes.TogglePendingProcessingQuestions;
}

export class ModalFeedbackToggle implements Action {
  readonly type = QuestionsActionTypes.ModalFeedbackToggle;
}

export type QuestionsActionsUnion =
  | SetQuestions
  | GetQuestions
  | PostFeedback
  | TogglePendingProcessingQuestions
  | ModalFeedbackToggle;
