import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Track } from '../models/track';
import { TrackActionTypes, TrackActionsUnion } from '../actions/track.actions';

export interface State extends EntityState<Track> {}

export function sortByName(a: Track, b: Track): number {
  return a.name.localeCompare(b.name);
}

export const trackAdapter: EntityAdapter<Track> = createEntityAdapter<Track>({
  selectId: (track: Track) => track._id,
  sortComparer: sortByName,
});

export const initialState: State = trackAdapter.getInitialState();

export function reducer(
  state = initialState,
  action: TrackActionsUnion
): State {
  switch (action.type) {
    case TrackActionTypes.SetTracks: {
      return trackAdapter.addAll(action.payload, state);
    }

    default: {
      return state;
    }
  }
}
