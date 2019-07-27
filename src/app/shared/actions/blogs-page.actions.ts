import { Action } from '@ngrx/store';
import { Blog } from '../models/blog';

export enum BlogsPageActionTypes {
  Load = '[Blogs Page] Load Blogs',
  GetBlog = '[Blogs Page] Get Blog'
}

export class Load implements Action {
  readonly type = BlogsPageActionTypes.Load;
}

export class GetBlog implements Action {
  readonly type = BlogsPageActionTypes.GetBlog;

  constructor(public payload: any) {}
}

export type BlogsPageActionsUnion =
  | Load
  | GetBlog;
