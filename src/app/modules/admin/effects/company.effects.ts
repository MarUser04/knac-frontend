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
  GetCompanies,
  SetCompanies,
  CompanyActionTypes,
  UpdateCompany,
  SetCompany,
  CreateCompany,
  DeleteCompany,
  CreateCompanyManually
} from '../actions/company.actions';
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

@Injectable()
export class CompanyEffects {
  @Effect()
  getCompanies$: Observable<Action> = this.actions$
    .ofType<GetCompanies>(CompanyActionTypes.GetCompanies)
    .pipe(
      exhaustMap(() => {
        return this.admin
          .getCompanies()
          .pipe(
            map(companies => new SetCompanies(companies)),
            catchError(err =>
              of(
                this.toast.pop(
                  warnToast('Error obtaining your companies list!')
                )
              )
            )
          );
      })
    );

  @Effect()
  updateCompany$: Observable<Action> = this.actions$
    .ofType<UpdateCompany>(CompanyActionTypes.UpdateCompany)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalUpdateToggle())),
      map(action => action.payload),
      exhaustMap(data =>
        this.admin.updateCompany(data, data._id).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Company updated!'))),
          map(company => new GetCompanies()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new Loading());
            delay(800);
            this.store.dispatch(new ModalUpdateToggle());
          })
        )
      )
    );

  @Effect()
  createCompany$: Observable<Action> = this.actions$
    .ofType<CreateCompany>(CompanyActionTypes.CreateCompany)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Pending())),
      exhaustMap(data =>
        this.admin.createCompanyById(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Company Created!'))),
          map(company => new GetCompanies()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Account could not be created!'));
          }),
          finalize(() => this.store.dispatch(new Pending()))
        )
      )
    );

  @Effect()
  createCompanyManually$: Observable<Action> = this.actions$
    .ofType<CreateCompanyManually>(CompanyActionTypes.CreateCompanyManually)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalCreateToggle())),
      exhaustMap(data =>
        this.admin.createCompanyManually(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Company Created!'))),
          map(company => new GetCompanies()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Account could not be created!'));
          }),
          finalize(() => {
            this.store.dispatch(new Loading());
            delay(500);
            this.store.dispatch(new ModalCreateToggle());
          })
        )
      )
    );

  @Effect()
  deleteCompany$: Observable<Action> = this.actions$
    .ofType<DeleteCompany>(CompanyActionTypes.DeleteCompany)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Pending())),
      exhaustMap(data =>
        this.admin.deleteCompanyById(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Company Deleted!'))),
          map(company => new GetCompanies()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => this.store.dispatch(new Pending()))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private admin: AdminService,
    private message: HandleErrorService,
    private store: Store<Company>,
    private toast: ToasterService
  ) {}
}
