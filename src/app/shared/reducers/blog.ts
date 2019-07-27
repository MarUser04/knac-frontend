import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Blog } from '../models/blog';
import {
  BlogsApiActionTypes,
  BlogsApiActionsUnion
} from '../actions/blogs-api.actions';

export interface State extends Blog {}

export const initialState: State = {
  _embedded: {
    'wp:featuredmedia': [{ source_url: '/assets/images/user_placeholder.png' }],
    author: [{ name: '' }]
  }
};

export function reducer(
  state = initialState,
  action: BlogsApiActionsUnion
): State {
  switch (action.type) {
    case BlogsApiActionTypes.LoadBlog: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
