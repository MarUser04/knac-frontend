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
  UpdateQuestions,
  QuestionsActionTypes
} from '../actions/questions.actions';
import { Pending, Loading } from '../actions/page.actions';
import { AppError } from '@app/state/app-actions';
import { AdminService } from '@app/services/admin/admin.service';
import { warnToast, successToast } from '@app/helpers/helper';
import { Questions } from '../models/questions';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class QuestionsEffects {
  @Effect()
  updateQuestions$: Observable<Action> = this.actions$
    .ofType<UpdateQuestions>(QuestionsActionTypes.UpdateQuestions)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      map(action => action.payload),
      exhaustMap(data => {
        return this.admin
          .updateQuestions(data)
          .pipe(
            tap(() => this.toast.pop(successToast('Questions Updated!'))),
            map((questions: Questions) => new SetQuestions(questions)),
            catchError(err =>
              of(this.toast.pop(warnToast('Error updating your questions!')))
            ),
            finalize(() => this.store.dispatch(new Loading()))
          );
      })
    );

  @Effect()
  getQuestions$: Observable<Action> = this.actions$
    .ofType<GetQuestions>(QuestionsActionTypes.GetQuestions)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      exhaustMap(() => {
        return this.admin
          .getQuestions()
          .pipe(
            map((questions: Questions) => new SetQuestions(questions)),
            catchError(err =>
              of(
                this.toast.pop(
                  warnToast('Error obtaining your companies list!')
                )
              )
            ),
            finalize(() => this.store.dispatch(new Loading()))
          );
      })
    );

  constructor(
    private actions$: Actions,
    private admin: AdminService,
    private message: HandleErrorService,
    private store: Store<Questions>,
    private toast: ToasterService
  ) {}
}
