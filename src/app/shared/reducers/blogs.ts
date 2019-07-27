import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Blog } from '../models/blog';
import { BlogsApiActionTypes, BlogsApiActionsUnion } from '../actions/blogs-api.actions';

export interface State extends EntityState<Blog> {}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (blog: Blog) => blog.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: BlogsApiActionsUnion
): State {
  switch (action.type) {
    case BlogsApiActionTypes.LoadSuccess: {
      return adapter.addAll(action.payload, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: getBlogIds,
  selectEntities: getBlogEntities,
  selectAll: getAllBlogs,
  selectTotal: getTotalBlogs,
} = adapter.getSelectors();
