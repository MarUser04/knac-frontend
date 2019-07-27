import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  map,
  exhaustMap,
  mergeMap,
  delay,
  tap,
  finalize
} from 'rxjs/operators';
import {
  PublicProfileActionTypes,
  GetProfessional,
  GetProfessionalByID,
  SetProfessional,
  PostPhoto,
  DeletePhoto,
  EditPhoto,
  PendingProfilePhote,
  ModalGaleryToggle,
  DownloadCV,
  IsProfile
} from '../actions/public-profile.actions';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { ProfessionalServices } from '@app/services/professional/professional.service';
import * as fromProfessional from '@app/shared/reducers';
import { Router } from '@angular/router';

@Injectable()
export class PublicProfileEffects {
  @Effect()
  GetProfessional$: Observable<Action> = this.actions$
    .ofType<GetProfessional>(PublicProfileActionTypes.GetProfessional)
    .pipe(
      exhaustMap(() =>
        this.professionalServices.getProfessional().pipe(
          map(profile => {
            if (!profile.profile) {
              this.toast.pop(warnToast('build your profile first, please!'));
              this.router.navigate(['/professional/profile']);
            }
            return new SetProfessional(profile);
          }),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining Profile!')))
          )
        )
      )
    );

  @Effect()
  IsProfile$: Observable<Action> = this.actions$
    .ofType<IsProfile>(PublicProfileActionTypes.IsProfile)
    .pipe(
      exhaustMap(() =>
        this.professionalServices.getProfessional().pipe(
          map(profile => {
            return new SetProfessional(profile);
          }),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining Profile!')))
          )
        )
      )
    );

  @Effect()
  GetProfessionalByID$: Observable<Action> = this.actions$
    .ofType<GetProfessionalByID>(PublicProfileActionTypes.GetProfessionalByID)
    .pipe(
      map(action => action.payload),
      mergeMap(id =>
        this.professionalServices.getProfessionalByIdByCompany(id).pipe(
          map(profile => {
            return new SetProfessional(profile);
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('error obtaining the professional profile!')
              )
            )
          )
        )
      )
    );

  @Effect()
  PostPhoto$: Observable<Action> = this.actions$
    .ofType<PostPhoto>(PublicProfileActionTypes.PostPhoto)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new PendingProfilePhote())),
      tap(() => this.store.dispatch(new ModalGaleryToggle())),
      delay(500),
      exhaustMap(data =>
        this.professionalServices.postPhoto(data).pipe(
          map(() => {
            delay(400);
            this.store.dispatch(new GetProfessional());
            return this.toast.pop(successToast('Add photo to profile'));
          }),
          catchError(({ error }) => {
            return of(this.toast.pop(warnToast(error.message)));
          }),
          finalize(() => {
            this.store.dispatch(new PendingProfilePhote());
            delay(3000);
            this.store.dispatch(new ModalGaleryToggle());
          })
        )
      )
    );

  @Effect()
  EditPhoto$: Observable<Action> = this.actions$
    .ofType<EditPhoto>(PublicProfileActionTypes.EditPhoto)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new PendingProfilePhote())),
      tap(() => this.store.dispatch(new ModalGaleryToggle())),
      delay(500),
      exhaustMap(data =>
        this.professionalServices.editPhoto(data).pipe(
          map(() => {
            delay(400);
            this.store.dispatch(new GetProfessional());
            this.store.dispatch(new PendingProfilePhote());
            return this.toast.pop(successToast('Edit photo to profile'));
          }),
          catchError(({ error }) => {
            return of(this.toast.pop(warnToast(error.message)));
          }),
          finalize(() => {
            this.store.dispatch(new PendingProfilePhote());
            delay(3000);
            this.store.dispatch(new ModalGaleryToggle());
          })
        )
      )
    );

  @Effect()
  DeletePhoto$: Observable<Action> = this.actions$
    .ofType<DeletePhoto>(PublicProfileActionTypes.DeletePhoto)
    .pipe(
      map(action => action.payload),
      delay(500),
      exhaustMap(id =>
        this.professionalServices.deletePhoto(id).pipe(
          map(() => {
            delay(400);
            this.store.dispatch(new GetProfessional());
            return this.toast.pop(successToast('Delete photo to profile'));
          }),
          catchError(({ error }) => {
            return of(this.toast.pop(warnToast(error.message)));
          })
        )
      )
    );

  @Effect()
  DownloadCV$: Observable<Action> = this.actions$
    .ofType<DownloadCV>(PublicProfileActionTypes.DownloadCV)
    .pipe(
      map(action => action.payload),
      delay(500),
      exhaustMap(url =>
        this.professionalServices.downloadCV(url).pipe(
          map(data => {
            delay(400);
            return this.toast.pop(successToast('Delete photo to profile'));
          }),
          catchError(({ error }) => {
            return of(this.toast.pop(warnToast(error.message)));
          })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private professionalServices: ProfessionalServices,
    private toast: ToasterService,
    private store: Store<fromProfessional.State>,
    private router: Router
  ) {}
}
