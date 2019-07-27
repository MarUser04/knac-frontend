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
  ProfessionalsActionTypes,
  GetProfessionals,
  SearchProfessionalsAdmin,
  SetProfessionals,
  GetProfessional,
  SetProfessional
} from '../actions/professionals.actions';
import { AuthService } from '@app/services/auth/auth.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { AdminService } from '@app/services/admin/admin.service';


@Injectable()
export class ProfessionalsEffects {
  @Effect()
  getProfessionals$: Observable<Action> = this.actions$
    .ofType<GetProfessionals>(ProfessionalsActionTypes.GetProfessionals)
    .pipe(
      exhaustMap(() =>
        this.admin.getProfessionals().pipe(
          map(professionals => new SetProfessionals(professionals)),
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
  getProfessional$: Observable<Action> = this.actions$
    .ofType<GetProfessional>(ProfessionalsActionTypes.GetProfessional)
    .pipe(
      map(action => action.payload),
      exhaustMap((id) => {
        return this.admin.getProfessional(id).pipe(
          map( professional => new SetProfessional(professional)),
          catchError(err =>
            of(
              this.toast.pop(warnToast('Error obtaining your professional list!'))
            )
          )
        );
      })
    );

  @Effect()
  SearchProfessional$: Observable<Action> = this.actions$
    .ofType<SearchProfessionalsAdmin>(
      ProfessionalsActionTypes.SearchProfessionalsAdmin
    )
    .pipe(
      map(action => action.payload),
      exhaustMap(term =>
        this.admin.searchProfessionalAdmin(term).pipe(
          map(prfs => {
            return new SetProfessionals(prfs);
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error obtaining the professional, please reload')
              )
            )
          )
        )
      )
    );

  constructor(
    private actions$: Actions,
    private admin: AdminService,
    private toast: ToasterService
  ) {}
}
