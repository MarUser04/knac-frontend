import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromRegister from './register';

export interface SiteState {
  register: fromRegister.State;
}

export interface State extends fromRoot.State {
  register: SiteState;
}

export const reducers: ActionReducerMap<SiteState> = {
  register: fromRegister.reducer
};

// Selectors

export const getSiteState = createFeatureSelector<SiteState>('site');

export const getRegisterState = createSelector(
  getSiteState,
  (state: SiteState): fromRegister.State => state.register
);

export const getProfilePending = createSelector(
  getRegisterState,
  (register) => register.pending
);
