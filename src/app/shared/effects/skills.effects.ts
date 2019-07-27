import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, exhaustMap, tap, mergeMap } from 'rxjs/operators';

import {
  SkillsActionUnion,
  GetSkillsList,
  SetSkillsList,
  SkillsActionTypes
} from '../actions/skills.actions';
import { warnToast, successToast } from '@app/helpers/helper';
import { ToasterService } from 'angular2-toaster';
import { SkillsService } from '../../services/skills/skills.service';

@Injectable()
export class SkillsEffects {
  @Effect()
  GetSkillsList$: Observable<Action> = this.actions$.pipe(
    ofType(SkillsActionTypes.GetSkillsList),
    exhaustMap(() =>
      this.skillsService.getSkills().pipe(
        map(response => new SetSkillsList(response)),
        catchError(err =>
          of(this.toast.pop(warnToast('Error obtaining Skills!')))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private skillsService: SkillsService,
    private toast: ToasterService
  ) {}
}
