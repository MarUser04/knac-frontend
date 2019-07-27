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
  ProfileActionTypes,
  UpdateProfile,
  GetProfile,
  SetProfile,
  TogglePending,
  PendingProfile
} from '../actions/profile.actions';
import { AppError } from '@app/state/app-actions';
import { AuthService } from '@app/services/auth/auth.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { Profile } from '../models/profile';
import { HandleErrorService } from '@app/services/handleError/handleError.service';

@Injectable()
export class ProfileEffects {
  @Effect()
  getProfile$: Observable<Action> = this.actions$
    .ofType<GetProfile>(ProfileActionTypes.GetProfile)
    .pipe(
      exhaustMap(() =>
        this.user.getCurrentProfile('/professionals/profile').pipe(
          map(profile => {
            if (!profile) {
              this.toast.pop(warnToast('build your profile first, please!'));
              this.router.navigate(['/professional/profile']);
            }
            return new SetProfile(profile);
          }),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining your profile!')))
          )
        )
      )
    );

  @Effect()
  updateProfile$: Observable<Action> = this.actions$
    .ofType<UpdateProfile>(ProfileActionTypes.UpdateProfile)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new PendingProfile())),
      exhaustMap(form =>
        this.user.updateProfile(form).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Profile updated!'))),
          map(profile => new GetProfile()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);

            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => this.store.dispatch(new PendingProfile()))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private user: AuthService,
    private message: HandleErrorService,
    private toast: ToasterService,
    private store: Store<Profile>,
    private router: Router
  ) {}
}
