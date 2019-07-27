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
  UpdatePassword,
  DisableEnableUsers,
  DeleteCompanyById,
  AdminActionsUnion,
  AdminActionTypes,
  PROFESSIONAL
} from '../actions/admin.actions';
import {
  Pending,
  Loading,
  ModalCreateToggle,
  ModalUpdateToggle
} from '../actions/page.actions';
import { AppError } from '@app/state/app-actions';
import { AdminService } from '@app/services/admin/admin.service';
import { warnToast, successToast } from '@app/helpers/helper';
import { Company } from '../models/company';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';
import { GetCompanyList } from '@app/modules/admin/actions/companies.actions';
import { GetProfessionals } from '@app/modules/admin/actions/professionals.actions';

@Injectable()
export class AdminEffects {
  @Effect()
  updateCompany$: Observable<Action> = this.actions$
    .ofType<UpdatePassword>(AdminActionTypes.UpdatePassword)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      map(action => action.payload),
      exhaustMap(data =>
        this.admin.updatePassword(data).pipe(
          delay(500),
          map(() => {
            this.router.navigate(['/admin/company/list']);
            return this.toast.pop(successToast('Company updated password!'));
          }),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new Loading());
          })
        )
      )
    );

  @Effect()
  disableEnableUsers$: Observable<Action> = this.actions$
    .ofType<DisableEnableUsers>(AdminActionTypes.DisableEnableUsers)
    .pipe(
      map(action => action.payload),
      exhaustMap(data =>
        this.admin.disableEnableUsers(data.id).pipe(
          map(dt => {
            const mssg = dt.disabled ? 'disabling' : 'enabling';
            this.toast.pop(successToast(`Success ${mssg} this account`));
            if (data.type === PROFESSIONAL) {
              return new GetProfessionals();
            }
            return new GetCompanyList();
          }),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Failed enabling/disabling this account!'));
          })
        )
      )
    );

  @Effect()
  deleteCompanyById$: Observable<Action> = this.actions$
    .ofType<DeleteCompanyById>(AdminActionTypes.DeleteCompanyById)
    .pipe(
      map(action => action.payload),
      exhaustMap(({ id, type }) =>
        this.admin.deleteCompanyProfileById(id).pipe(
          map(response => {
            console.log(response);
            this.toast.pop(successToast('Success deleting this account'));
            if (type === PROFESSIONAL) {
              return new GetProfessionals();
            }
            return new GetCompanyList();
          }),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Failed deleting this account!'));
          })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private admin: AdminService,
    private message: HandleErrorService,
    private store: Store<Company>,
    private toast: ToasterService,
    private router: Router
  ) {}
}
