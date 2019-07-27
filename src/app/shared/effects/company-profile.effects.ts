import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  map,
  exhaustMap,
  switchMap,
  tap,
  mergeMap,
  finalize
} from 'rxjs/operators';
import {
  CompanyProfileActionTypes,
  GetCompanyProfile,
  GetCompanyByID,
  SetCompany,
  GetCompanyAssessments,
  SetCompanyAssessments,
  GetAssessmentByID,
  SetAssessmentByID
} from '../actions/company-profile.actions';
import { AuthService } from '@app/services/auth/auth.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { CompanyProfileServices } from '@app/services/company/company-profile/company-profile.service';
import { CompanyAssessmentService } from '@app/services/company/company-assessment/company-assessment.service';

@Injectable()
export class CompanyProfileEffects {
  @Effect()
  GetCompanyByID$: Observable<Action> = this.actions$
    .ofType<GetCompanyByID>(CompanyProfileActionTypes.GetCompanyByID)
    .pipe(
      map(action => action.payload),
      mergeMap(id =>
        this.companyProfileServices.getCompanyById(id).pipe(
          map(company => {
            return new SetCompany(company);
          }),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining Company Profile!')))
          )
        )
      )
    );

  @Effect()
  GetCompanyProfile$: Observable<Action> = this.actions$
    .ofType<GetCompanyProfile>(CompanyProfileActionTypes.GetCompanyProfile)
    .pipe(
      exhaustMap(() =>
        this.companyProfileServices
          .getCompany()
          .pipe(
            switchMap(company => [
              new SetCompany(company),
              new GetCompanyAssessments()
            ]),
            catchError(err =>
              of(
                this.toast.pop(
                  warnToast('Error obtaining your Company Profile!')
                )
              )
            )
          )
      )
    );

  @Effect()
  GetAssessment$: Observable<Action> = this.actions$
    .ofType<GetCompanyAssessments>(
      CompanyProfileActionTypes.GetCompanyAssessments
    )
    .pipe(
      exhaustMap(() =>
        this.companyAssessmentService.getCompanyAssessments().pipe(
          map(assessment => {
            return new SetCompanyAssessments(assessment);
          }),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining Assessments!')))
          )
        )
      )
    );

  @Effect()
  GetAssessmentByID$: Observable<Action> = this.actions$
    .ofType<GetAssessmentByID>(CompanyProfileActionTypes.GetAssessmentByID)
    .pipe(
      map(action => action.payload),
      mergeMap(id =>
        this.companyAssessmentService.getAssessmentsByID(id).pipe(
          map(assessment => {
            return new SetAssessmentByID(assessment);
          }),
          catchError(({ message }) => of(this.toast.pop(warnToast(message))))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private companyProfileServices: CompanyProfileServices,
    private companyAssessmentService: CompanyAssessmentService,
    private toast: ToasterService
  ) {}
}
