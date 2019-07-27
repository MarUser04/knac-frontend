import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  map,
  exhaustMap,
  tap,
  mergeMap
} from 'rxjs/operators';

import {
  TrackActionTypes,
  GetTrackList,
  SetTrackList
} from '../actions/track.actions';
import { warnToast, successToast } from '@app/helpers/helper';
import { ToasterService } from 'angular2-toaster';
import { TrackService } from '../../services/track/track.service';

@Injectable()
export class TrackEffects {
  @Effect()
  GetTrackList$: Observable<Action> = this.actions$.pipe(
    ofType(TrackActionTypes.GetTrackList),
    exhaustMap(() =>
      this.trackService.getTracks()
        .pipe(
          map((response) => new SetTrackList(response)),
          catchError((err) => of(this.toast.pop(warnToast('Error obtaining Tracks!')))),
        )
    )
  );

  constructor(
    private actions$: Actions,
    private trackService: TrackService,
    private toast: ToasterService
  ) {}
}
