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
  GetCompanyList,
  SetCompanyList,
  UpdateEmail,
  UpdateCompany,
  SearchCompanyAdmin,
  CompaniesActionTypes,
  GetCompany,
  SetCompany
} from '../actions/companies.actions';
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
import { Injectable } from '@angular/core';

@Injectable()
export class CompaniesEffects {
  @Effect()
  getCompanyList$: Observable<Action> = this.actions$
    .ofType<GetCompanyList>(CompaniesActionTypes.GetCompanyList)
    .pipe(
      exhaustMap(() => {
        return this.admin.getCompanyList().pipe(
          map(companies => new SetCompanyList(companies)),
          catchError(err =>
            of(
              this.toast.pop(warnToast('Error obtaining your companies list!'))
            )
          )
        );
      })
    );

  @Effect()
  getCompany$: Observable<Action> = this.actions$
    .ofType<GetCompany>(CompaniesActionTypes.GetCompany)
    .pipe(
      map(action => action.payload),
      exhaustMap(id => {
        return this.admin.getCompany(id).pipe(
          map(company => new SetCompany(company)),
          catchError(err =>
            of(
              this.toast.pop(warnToast('Error obtaining your companies list!'))
            )
          )
        );
      })
    );

  @Effect()
  updateEmail$: Observable<Action> = this.actions$
    .ofType<UpdateEmail>(CompaniesActionTypes.UpdateEmail)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Loading())),
      delay(500),
      tap(() => this.store.dispatch(new ModalUpdateToggle())),
      exhaustMap(data => {
        return this.admin.updateEmail(data).pipe(
          map(() => {
            this.store.dispatch(new ModalUpdateToggle());
            this.store.dispatch(new GetCompanyList());
            return this.toast.pop(
              successToast('Your company email has successfully update!')
            );
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('That user already exists on the database!')
              )
            )
          ),
          finalize(() => this.store.dispatch(new Loading()))
        );
      })
    );

  @Effect()
  updateCompany$: Observable<Action> = this.actions$
    .ofType<UpdateCompany>(CompaniesActionTypes.UpdateCompany)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Loading())),
      delay(500),
      tap(() => this.store.dispatch(new ModalUpdateToggle())),
      exhaustMap(data => {
        return this.admin.updateCompanyProfile(data).pipe(
          map(() => {
            this.store.dispatch(new ModalUpdateToggle());
            this.store.dispatch(new GetCompany(data.id));
            return this.toast.pop(
              successToast('Your company profile has successfully update!')
            );
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('That user already exists on the database!')
              )
            )
          ),
          finalize(() => this.store.dispatch(new Loading()))
        );
      })
    );

  @Effect()
  SearchCompanyAdmin$: Observable<Action> = this.actions$
    .ofType<SearchCompanyAdmin>(CompaniesActionTypes.SearchCompanyAdmin)
    .pipe(
      map(action => action.payload),
      exhaustMap(term =>
        this.admin.searchCompanyAdmin(term).pipe(
          map(cmp => {
            return new SetCompanyList(cmp);
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Enter a text greater than 3 characters')
              )
            )
          )
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
