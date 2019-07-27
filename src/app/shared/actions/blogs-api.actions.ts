import { Action } from '@ngrx/store';
import { Blog } from '../models/blog';

export enum BlogsApiActionTypes {
  LoadSuccess = '[Blogs API] Load Success',
  LoadFail = '[Blogs API] Load Fail',
  LoadBlog = '[Blogs API] Load Blog',
}

export class LoadSuccess implements Action {
  readonly type = BlogsApiActionTypes.LoadSuccess;

  constructor(public payload: Blog[]) {}
}

export class LoadFail implements Action {
  readonly type = BlogsApiActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export class LoadBlog implements Action {
  readonly type = BlogsApiActionTypes.LoadBlog;

  constructor(public payload: Blog) {}
}

export type BlogsApiActionsUnion =
  | LoadSuccess
  | LoadFail
  | LoadBlog;
