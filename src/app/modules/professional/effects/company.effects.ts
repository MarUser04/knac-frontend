import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';

import {
  GetCompanies,
  SetCompanies,
  GetCompany,
  SetCompany,
  CompanyActionsUnion,
  CompanyActionTypes,
  SearchCompany
} from '../actions/company.actions';
import { warnToast } from '@app/helpers/helper';
import { ProfessionalServices } from '@app/services/professional/professional.service';

@Injectable()
export class CompaniesEffects {
  @Effect()
  getCompanies$: Observable<Action> = this.actions$
    .ofType<GetCompanies>(CompanyActionTypes.GetCompanies)
    .pipe(
      exhaustMap(() => {
        return this.professionalServices.getCompanies().pipe(
          map((companies: any[]) => new SetCompanies(companies)),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining your comapines list!')))
          )
        );
      })
    );

  @Effect()
  getCompany$: Observable<Action> = this.actions$
    .ofType<GetCompany>(CompanyActionTypes.GetCompany)
    .pipe(
      map(action => action.payload),
      exhaustMap((id) => {
        return this.professionalServices.getCompany(id).pipe(
          map((company: any[]) => new SetCompany(company)),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining your company!')))
          )
        );
      })
    );

    @Effect()
    SearchCompany$: Observable<Action> = this.actions$
      .ofType<SearchCompany>(CompanyActionTypes.SearchCompany)
      .pipe(
        map(action => action.payload),
        exhaustMap(term =>
          this.professionalServices.searchCompanies(term).pipe(
            map(prfs => {
              return new SetCompanies(prfs);
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
    private professionalServices: ProfessionalServices,
    private toast: ToasterService
  ) {}
}
