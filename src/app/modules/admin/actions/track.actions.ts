import { Action } from '@ngrx/store';
import { Track } from '../models/track';

export enum TrackActionTypes {
  GetTracks    = '[Admin] GET Current Tracks',
  SetTrack     = '[Admin] SET Current Track',
  SetTracks    = '[Admin] SET Current Tracks',
  UpdateTrack  = '[Admin] PUT Current Track',
  CreateTrack  = '[Admin] Create Track',
  DeleteTrack  = '[Admin] Delete Track'
}

export class SetTrack implements Action {
  readonly type = TrackActionTypes.SetTrack;

  constructor(public payload: any) {}
}

export class SetTracks implements Action {
  readonly type = TrackActionTypes.SetTracks;

  constructor(public payload: Track[]) {}
}

export class GetTracks implements Action {
  readonly type = TrackActionTypes.GetTracks;
}

export class UpdateTrack implements Action {
  readonly type = TrackActionTypes.UpdateTrack;

  constructor(public payload: any) {}
}

export class CreateTrack implements Action {
  readonly type = TrackActionTypes.CreateTrack;

  constructor(public payload: any) {}
}

export class DeleteTrack implements Action {
  readonly type = TrackActionTypes.DeleteTrack;

  constructor(public payload: any) {}
}

export type TrackActionsUnion =
| SetTrack
| SetTracks
| UpdateTrack
| CreateTrack
| DeleteTrack;
