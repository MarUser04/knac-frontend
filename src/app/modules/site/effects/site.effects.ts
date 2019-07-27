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
  SiteActionTypes,
  CreateProfile,
  TogglePending
} from '../actions/site.actions';
import { AppError } from '@app/state/app-actions';
import { CompanyService } from '@app/services/company/company.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { HandleErrorService } from '@app/services/handleError/handleError.service';

@Injectable()
export class SiteEffects {
  @Effect()
  createProfile$: Observable<Action> = this.actions$
    .ofType<CreateProfile>(SiteActionTypes.CreateProfile)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new TogglePending())),
      exhaustMap(company =>
        this.company.requestAccount(company).pipe(
          map((response: Response) => {
            const resp = response.json();
            this.router.navigate(['/home/signup/company/success']);
            return this.toast.pop(
              successToast('your credentials has been sent!')
            );
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error requesting your profile credentials!')
              )
            )
          ),
          finalize(() => this.store.dispatch(new TogglePending()))
        )
      )
    );
  constructor(
    private actions$: Actions,
    private company: CompanyService,
    private message: HandleErrorService,
    private toast: ToasterService,
    private store: Store<any>,
    private router: Router
  ) {}
}
