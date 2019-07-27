import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import {
  catchError,
  map,
  exhaustMap,
  switchMap,
  tap,
  mergeMap,
  flatMap,
  finalize,
  delay,
  concatMap
} from 'rxjs/operators';

import {
  CompanyActionTypes,
  UpdateProfile,
  GetProfile,
  SetProfile,
  PendingProfile,
  SetupPassword,
  ModalUpdateToggle,
  CompanyPending,
  HasSetupPassword,
  HasLoadedProfile,
  UpdatePassword
} from '../actions/company.actions';

import { AppError } from '@app/state/app-actions';
import { AuthService } from '@app/services/auth/auth.service';
import { warnToast, successToast, errorToast } from '@app/helpers/helper';
import { Company } from '../models/company';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { CompanyService } from '@app/services/company/company.service';
import { GetCompanyProfile } from '@app/shared/actions/company-profile.actions';
import * as fromCompany from '../reducers';

@Injectable()
export class CompanyEffects {
  @Effect()
  getProfile$: Observable<Action> = this.actions$
    .ofType<GetProfile>(CompanyActionTypes.GetProfile)
    .pipe(
      exhaustMap(() =>
        this.user.getCurrentProfile('/companies/profile').pipe(
          // Splitter Pattern
          flatMap(({ profile }) => [
            new HasSetupPassword(true),
            new SetProfile(profile)
          ]),
          catchError((err: HttpErrorResponse) => {
            if (err.status === 400) {
              this.toast.pop(
                warnToast(
                  'You need to change your password before moving forward!'
                )
              );
              return of(new HasSetupPassword(false));
            } else if (err.status === 401) {
              return of(this.toast.pop(warnToast('You need to be logged in!')));
            } else {
              return of(
                this.toast.pop(errorToast('Error obtaining your profile!'))
              );
            }
          }),
          finalize(() => this.store.dispatch(new HasLoadedProfile(true)))
        )
      )
    );

  @Effect()
  setupPassword$: Observable<Action> = this.actions$
    .ofType<SetupPassword>(CompanyActionTypes.SetupPassword)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new CompanyPending())),
      exhaustMap(password =>
        this.company.setupPassword(password).pipe(
          delay(300),
          tap(() => this.router.navigate(['/company/profile'])),
          map(() => this.toast.pop(successToast('Credentials updated!'))),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Password could not be updated!'));
          }),
          finalize(() => this.store.dispatch(new CompanyPending()))
        )
      )
    );

  @Effect()
  updateProfile$: Observable<Action> = this.actions$
    .ofType<UpdateProfile>(CompanyActionTypes.UpdateProfile)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new PendingProfile())),
      tap(() => this.store.dispatch(new ModalUpdateToggle())),
      exhaustMap(company =>
        this.company.updateProfile(company).pipe(
          tap(() => this.toast.pop(successToast('Company profile updated!'))),
          map(profile => new GetCompanyProfile()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new PendingProfile());
            delay(3000);
            this.store.dispatch(new ModalUpdateToggle());
          })
        )
      )
    );

  @Effect()
  updatePassword$: Observable<Action> = this.actions$
    .ofType<UpdatePassword>(CompanyActionTypes.UpdatePassword)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new CompanyPending())),
      delay(500),
      exhaustMap(data =>
        this.company.updatePassword(data).pipe(
          map(() => {
            this.router.navigate(['/company/profile']);
            return this.toast.pop(successToast('Company updated password!'));
          }),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new CompanyPending());
          })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private user: AuthService,
    private company: CompanyService,
    private message: HandleErrorService,
    private toast: ToasterService,
    private store: Store<fromCompany.CompanyState>,
    private router: Router
  ) {}
}
