import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
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
  GetAssessments,
  GetAssessment,
  GetCompletedAssessments,
  GetTemplate,
  SetAssessments,
  SetAssessment,
  SetCompletedAssessments,
  TakeAssessment,
  TogglePendingProcessingAssessment,
  TakingPendingProcessingAssessment,
  SubmitAssessment,
  GetFeedbackByAssessment,
  SetFeedbackByAssessment,
  GetQuestions,
  SetQuestions
} from '../actions/assessments.actions';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { ProfessionalServices } from '@app/services/professional/professional.service';
import { Assessment } from '@app/shared/models/assessment';
import { empty } from 'rxjs/Observer';
import * as fromAssessment from '../reducers';

@Injectable()
export class AssessmentEffects {
  @Effect()
  getAssessment$: Observable<Action> = this.actions$
    .ofType<GetAssessments>(AssessmentActionTypes.GetAssessments)
    .pipe(
      exhaustMap(() => {
        return this.professionalServices.getAssessment().pipe(
          map((assessment: Assessment[]) => new SetAssessments(assessment)),
          catchError(err =>
            of(
              this.toast.pop(warnToast('Error obtaining your assessment list!'))
            )
          )
        );
      })
    );

  @Effect()
  getCompletedAssessment$: Observable<Action> = this.actions$
    .ofType<GetCompletedAssessments>(
      AssessmentActionTypes.GetCompletedAssessments
    )
    .pipe(
      exhaustMap(() => {
        return this.professionalServices.getCompletedAssessments().pipe(
          map(
            (completedAssessment: string[]) =>
              new SetCompletedAssessments(completedAssessment)
          ),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error obtaining your completed assessment list!')
              )
            )
          )
        );
      })
    );

  @Effect()
  takeAssessment$: Observable<Action> = this.actions$
    .ofType<TakeAssessment>(AssessmentActionTypes.TakeAssessment)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new TogglePendingProcessingAssessment())),
      delay(500),
      exhaustMap(id => {
        return this.professionalServices.takeAssessment(id).pipe(
          map(assessment => {
            this.store.dispatch(new SetAssessment(assessment));
            return new TakingPendingProcessingAssessment();
          }),
          catchError(({ error }) =>
            of(this.toast.pop(warnToast(error.message)))
          ),
          finalize(() => {
            this.store.dispatch(new TogglePendingProcessingAssessment());
          })
        );
      })
    );

  @Effect()
  submitAssessment$: Observable<Action> = this.actions$
    .ofType<SubmitAssessment>(AssessmentActionTypes.SubmitAssessment)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new TogglePendingProcessingAssessment())),
      delay(500),
      exhaustMap(({ id, data }) =>
        this.professionalServices.submitAssessment(id, data).pipe(
          map(() => {
            delay(400);
            this.router.navigate(['/professional/assessment/success']);
            return this.toast.pop(
              successToast('Assessment successfuly submitted!')
            );
          }),
          catchError(({ error }) => {
            this.router.navigate(['/professional/assessments']);
            return of(this.toast.pop(warnToast(error.message)));
          }),
          finalize(() => {
            this.store.dispatch(new TakingPendingProcessingAssessment());
            return this.store.dispatch(new TogglePendingProcessingAssessment());
          })
        )
      )
    );

  @Effect()
  GetFeedbackByAssessment$: Observable<Action> = this.actions$
    .ofType<GetFeedbackByAssessment>(
      AssessmentActionTypes.GetFeedbackByAssessment
    )
    .pipe(
      map(action => action.payload),
      exhaustMap(id => {
        return this.professionalServices.getFeedback(id).pipe(
          map(feedback => new SetFeedbackByAssessment(feedback)),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error obtaining your feedback assessment')
              )
            )
          )
        );
      })
    );
  @Effect()
  getQuestions$: Observable<Action> = this.actions$
    .ofType<GetQuestions>(AssessmentActionTypes.GetQuestions)
    .pipe(
      exhaustMap(() => {
        return this.professionalServices.getQuestions().pipe(
          map((questions: any) => new SetQuestions(questions)),
          catchError(err =>
            of(
              this.toast.pop(warnToast('Error obtaining your questions list!'))
            )
          )
        );
      })
    );

  constructor(
    private actions$: Actions,
    private professionalServices: ProfessionalServices,
    private toast: ToasterService,
    private router: Router,
    private store: Store<fromAssessment.ProfessionalState>
  ) {}
}
