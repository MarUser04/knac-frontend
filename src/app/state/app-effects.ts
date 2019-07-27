import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  map,
  tap,
  mergeMap
} from 'rxjs/operators';

import {
  AppError,
  AppActionTypes
} from './app-actions';
import { State } from './index';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast } from '@app/helpers/helper';

@Injectable()
export class AppEffects {

  @Effect()
  appError$: Observable<Action> = this.actions$
    .ofType<AppError>(AppActionTypes.AppError)
    .pipe(
      map(action => action.payload),
      mergeMap((message) => of(this.toast.pop(warnToast(message)))),
    );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private toast: ToasterService,
  ) {}
}
