import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Track } from '../models/track';
import { TrackActionTypes, TrackActionUnion } from '../actions/track.actions';

export interface State {}

export const initialState: State = [];

export function reducer(
  state = initialState,
  action: TrackActionUnion
): State {
  switch (action.type) {
    case TrackActionTypes.SetTrackList: {
      const tracks = action.payload.sort((a: Track, b: Track) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return tracks;
    }
    default: {
      return state;
    }
  }
}
