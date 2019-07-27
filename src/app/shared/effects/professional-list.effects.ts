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
  ProfessionalListActionTypes,
  GetList,
  SetList,
  SearchProfessional
} from '../actions/professional-list.actions';
import { AuthService } from '@app/services/auth/auth.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { ProfessionalListServices } from '@app/services/professional/professional-list/profesional-list.service';

@Injectable()
export class ProfessionalListEffects {
  @Effect()
  GetList$: Observable<Action> = this.actions$
    .ofType<GetList>(ProfessionalListActionTypes.GetList)
    .pipe(
      exhaustMap(() =>
        this.professionalListServices.getProfessionalList().pipe(
          map(professionals => new SetList(professionals)),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error obtaining your Professional list!')
              )
            )
          )
        )
      )
    );

  @Effect()
  SearchProfessional$: Observable<Action> = this.actions$
    .ofType<SearchProfessional>(ProfessionalListActionTypes.SearchProfessional)
    .pipe(
      map(action => action.payload),
      exhaustMap(pay =>
        this.professionalListServices.searchProfessionals(pay).pipe(
          map(prfs => {
            return new SetList(prfs);
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
    private professionalListServices: ProfessionalListServices,
    private toast: ToasterService
  ) {}
}
