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
  UpdatePasswordProfessional,
  PendingUpdatePassword,
  ProfessionalActionTypes
} from '../actions/professional.actions';
import * as fromProfessional from '../reducers';
import { AppError } from '@app/state/app-actions';
import { AuthService } from '@app/services/auth/auth.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ProfessionalServices } from '@app/services/professional/professional.service';

@Injectable()
export class ProfessionalEffects {
  @Effect()
  updatePasswordProfessional$: Observable<Action> = this.actions$
    .ofType<UpdatePasswordProfessional>(
      ProfessionalActionTypes.UpdatePasswordProfessional
    )
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new PendingUpdatePassword())),
      delay(500),
      exhaustMap(data =>
        this.professionalServices.updatePassword(data).pipe(
          map(() => {
            this.router.navigate(['/professional']);
            return this.toast.pop(
              successToast('Professional updated password!')
            );
          }),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new PendingUpdatePassword());
          })
        )
      )
    );

  //     @Effect()
  // updateProfile$: Observable<Action> = this.actions$
  //   .ofType<UpdatePassword>(ProfessionalActionTypes.UpdatePassword)
  //   .pipe(
  //     map(action => action.payload),
  //     tap(() => this.store.dispatch(new PendingProfile())),
  //     exhaustMap((form) =>
  //       this.user.updateProfile(form)
  //         .pipe(
  //           delay(500),
  //           tap(() => this.toast.pop(successToast('Profile updated!'))),
  //           map((profile) => new GetProfile()),
  //           catchError(({error}) => {
  //             this.message.showAlertMssg(error);
  //             return of(new AppError('Check form instructions!'));
  //           }),
  //           finalize(() => this.store.dispatch(new PendingProfile()))
  //         )
  //       )
  //     );

  constructor(
    private actions$: Actions,
    private professionalServices: ProfessionalServices,
    private message: HandleErrorService,
    private toast: ToasterService,
    private store: Store<fromProfessional.ProfessionalState>,
    private router: Router
  ) {}
}
