import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  map,
  exhaustMap,
  switchMap,
  tap,
  mergeMap,
  finalize,
  delay
} from 'rxjs/operators';

import {
  GetTracks,
  SetTracks,
  TrackActionTypes,
  UpdateTrack,
  SetTrack,
  CreateTrack,
  DeleteTrack
} from '../actions/track.actions';
import {
  Pending,
  Loading,
  ModalCreateToggle,
  ModalUpdateToggle
} from '../actions/page.actions';
import { Track } from '../models/track';
import { AppError } from '@app/state/app-actions';
import { AdminService } from '@app/services/admin/admin.service';
import { warnToast, successToast } from '@app/helpers/helper';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';
import { AdminState } from '@app/modules/admin/reducers';

@Injectable()
export class TrackEffects {
  @Effect()
  getTracks$: Observable<Action> = this.actions$
    .ofType<GetTracks>(TrackActionTypes.GetTracks)
    .pipe(
      exhaustMap(() => {
        return this.admin.getTracks().pipe(
          map((tracks: Track[]) => new SetTracks(tracks)),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining your tracks list!')))
          )
        );
      })
    );

  @Effect()
  updateTrack$: Observable<Action> = this.actions$
    .ofType<UpdateTrack>(TrackActionTypes.UpdateTrack)
    .pipe(
      // tap(() => new PendingCompany()),
      map(action => action.payload),
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalUpdateToggle())),
      exhaustMap(data =>
        this.admin.updateTrackById(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Track Updated!'))),
          map(company => new GetTracks()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new Loading());
            delay(300);
            this.store.dispatch(new ModalUpdateToggle());
          })
        )
      )
    );

  @Effect()
  createTrack$: Observable<Action> = this.actions$
    .ofType<CreateTrack>(TrackActionTypes.CreateTrack)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalCreateToggle())),
      exhaustMap(data =>
        this.admin.createTrack(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Track Created!'))),
          map(company => new GetTracks()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new Loading());
            delay(800);
            this.store.dispatch(new ModalCreateToggle());
          })
        )
      )
    );

  @Effect()
  deleteTrack$: Observable<Action> = this.actions$
    .ofType<DeleteTrack>(TrackActionTypes.DeleteTrack)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Pending())),
      exhaustMap(data =>
        this.admin.deleteTrackById(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Track Deleted!'))),
          map(company => new GetTracks()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            delay(300);
            this.store.dispatch(new Pending());
          })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private admin: AdminService,
    private message: HandleErrorService,
    private store: Store<AdminState>,
    private toast: ToasterService
  ) {}
}
