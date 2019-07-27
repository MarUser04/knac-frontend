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
  GetQuestions,
  SetQuestions,
  PostFeedback,
  TogglePendingProcessingQuestions,
  QuestionsActionTypes,
  ModalFeedbackToggle
} from '../actions/questions.actions';
import { AppError } from '@app/state/app-actions';
import { CompanyService } from '@app/services/company/company.service';
import { warnToast, successToast } from '@app/helpers/helper';
import { Questions } from '../models/questions';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class QuestionsEffects {
  @Effect()
  getQuestions$: Observable<Action> = this.actions$
    .ofType<GetQuestions>(QuestionsActionTypes.GetQuestions)
    .pipe(
      exhaustMap(() => {
        return this.companyService.getQuestions().pipe(
          map((questions: Questions) => new SetQuestions(questions)),
          catchError(err =>
            of(
              this.toast.pop(warnToast('Error obtaining your questions list!'))
            )
          )
        );
      })
    );

  @Effect()
  postFeedback$: Observable<Action> = this.actions$
    .ofType<PostFeedback>(QuestionsActionTypes.PostFeedback)
    .pipe(
      tap(() => this.store.dispatch(new TogglePendingProcessingQuestions())),
      tap(() => this.store.dispatch(new ModalFeedbackToggle())),
      map(action => action.payload),
      exhaustMap(data => {
        return this.companyService.postFeedback(data).pipe(
          map((questions: Questions) => {
            this.router.navigate([
              `/company/assessments/${data.id}/submissions/${
                data.idS
              }/feedback/success`
            ]);
            return new SetQuestions(questions);
          }),
          catchError(err => {
            if (err.status === 400) {
              return of(
                this.toast.pop(
                  warnToast('You have already submitted this feedback')
                )
              );
            } else {
              return of(
                this.toast.pop(warnToast('Error sending your feedback!'))
              );
            }
          }),
          finalize(() => {
            this.store.dispatch(new TogglePendingProcessingQuestions());
            this.store.dispatch(new ModalFeedbackToggle());
          })
        );
      })
    );

  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private message: HandleErrorService,
    private store: Store<Questions>,
    private toast: ToasterService,
    private router: Router
  ) {}
}
