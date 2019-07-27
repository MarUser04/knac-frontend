import { Action } from '@ngrx/store';

export enum TrackActionTypes {
  GetTrackList = '[TRACK] GET TRACK LIST',
  SetTrackList = '[TRACK] SET TRACK LIST'
}

export class GetTrackList implements Action {
  readonly type = TrackActionTypes.GetTrackList;
}

export class SetTrackList implements Action {
  readonly type = TrackActionTypes.SetTrackList;
  constructor(public payload: any) {}
}

export type TrackActionUnion =
| GetTrackList
| SetTrackList;
