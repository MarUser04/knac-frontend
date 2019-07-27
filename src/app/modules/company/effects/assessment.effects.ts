import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
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
  AssessmentActionTypes,
  CreateAssessments,
  GetTemplate,
  SetTemplate,
  UpdateAssessment,
  DeleteAssessmentByID,
  GetCompanyAssessmentByID,
  GetCompanyAssessmentSubmissions,
  SetCompanyAssessmentSubmissions
} from '../actions/assessments.actions';
import { SetAssessmentByID } from '@app/shared/actions/company-profile.actions';

import { AuthService } from '@app/services/auth/auth.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { CompanyService } from '@app/services/company/company.service';
import { CompanyAssessmentService } from '@app/services/company/company-assessment/company-assessment.service';
import * as fromCompany from '../reducers';
import { Store } from '@ngrx/store';
import { CompanyPending } from 'app/modules/company/actions/company.actions';

@Injectable()
export class AssessmentEffects {
  @Effect()
  CreateAssessment$: Observable<Action> = this.actions$
    .ofType<CreateAssessments>(AssessmentActionTypes.CreateAssessment)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new CompanyPending())),
      // delay(400),
      exhaustMap(data =>
        this.companyAssessmentService.createAssessment(data).pipe(
          map(() => {
            this.router.navigate(['/company/assessments/create/success']);
            return this.toast.pop(
              successToast('Assessment successfuly created!')
            );
          }),
          catchError(err =>
            of(this.toast.pop(warnToast('Error Creating Assessments!')))
          ),
          finalize(() => {
            delay(400), this.store.dispatch(new CompanyPending());
          })
        )
      )
    );

  @Effect()
  GetTemplate$: Observable<Action> = this.actions$
    .ofType<GetTemplate>(AssessmentActionTypes.GetTemplate)
    .pipe(
      exhaustMap(() =>
        this.companyAssessmentService.getTemplate().pipe(
          map(company => {
            return new SetTemplate(company);
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error obtaining Templates, please reload')
              )
            )
          )
        )
      )
    );

  @Effect()
  UpdateAssessment$: Observable<Action> = this.actions$
    .ofType<UpdateAssessment>(AssessmentActionTypes.UpdateAssessment)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new CompanyPending())),
      delay(400),
      exhaustMap(({ id, body }) =>
        this.companyAssessmentService.updateAssessment(id, body).pipe(
          map(() => {
            this.router.navigate(['/company/assessments/updated/success']);
            return this.toast.pop(
              successToast('Assessment successfuly updated!')
            );
          }),
          catchError(err =>
            of(this.toast.pop(warnToast('Error Updating Assessments!')))
          ),
          finalize(() => {
            delay(400), this.store.dispatch(new CompanyPending());
          })
        )
      )
    );

  @Effect()
  GetCompanyAssessmentByID$: Observable<Action> = this.actions$
    .ofType<GetCompanyAssessmentByID>(
      AssessmentActionTypes.GetCompanyAssessmentByID
    )
    .pipe(
      map(action => action.payload),
      mergeMap(id =>
        this.companyAssessmentService.getAssessmentsByIDCompany(id).pipe(
          map(assessment => {
            return new SetAssessmentByID(assessment);
          }),
          catchError(({ message }) => of(this.toast.pop(warnToast(message))))
        )
      )
    );

  @Effect()
  GetCompanyAssessmentSubmissions$: Observable<Action> = this.actions$
    .ofType<GetCompanyAssessmentSubmissions>(
      AssessmentActionTypes.GetCompanyAssessmentSubmissions
    )
    .pipe(
      map(action => action.payload),
      mergeMap(payload =>
        this.companyAssessmentService.getAssessmentSubmission(payload).pipe(
          map(assessment => {
            return new SetCompanyAssessmentSubmissions(assessment);
          }),
          catchError(({ message }) => of(this.toast.pop(warnToast(message))))
        )
      )
    );

  @Effect()
  $DeleteAssessmentByID: Observable<Action> = this.actions$
    .ofType<DeleteAssessmentByID>(AssessmentActionTypes.DeleteAssessmentByID)
    .pipe(
      map(action => action.payload),
      exhaustMap(id =>
        this.companyAssessmentService.deleteAssessmentsByID(id).pipe(
          delay(400),
          tap(() => this.router.navigate(['/company/assessments'])),
          map(() =>
            this.toast.pop(successToast('Assessment successfuly deleted!'))
          ),
          catchError(err =>
            of(this.toast.pop(warnToast('Error Deleting Assessments!')))
          )
        )
      )
    );

  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private companyAssessmentService: CompanyAssessmentService,
    private toast: ToasterService,
    private store: Store<fromCompany.CompanyState>,
    private router: Router
  ) {}
}
