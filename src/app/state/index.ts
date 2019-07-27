import { Params } from '@angular/router';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { Logout } from '@app/state/app-actions';
import { environment as env } from '@app/../environments/environment';
import * as fromShow from './show-reducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  show: boolean;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  show: fromShow.showReducer,
};

export function logout(reducer: ActionReducer<any>): any {
  return function (state, action) {
    return reducer(action.type === 'LOGOUT' ? undefined : state, action);
  };
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !env.production
  ? [logger, logout]
  : [logout];

export const getAppState = createFeatureSelector<boolean>('show');

export const getShow = createSelector(
  getAppState,
  (show: boolean): boolean => show
);
