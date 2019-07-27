import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';

import {
  GetSkills,
  SetSkills,
  SkillsActionTypes
} from '../actions/skill.actions';
import { warnToast } from '@app/helpers/helper';
import { Skill } from '../models/skill';
import { ProfessionalServices } from '@app/services/professional/professional.service';

@Injectable()
export class SkillEffects {
  @Effect()
  getSkills$: Observable<Action> = this.actions$
    .ofType<GetSkills>(SkillsActionTypes.GetSkills)
    .pipe(
      exhaustMap(() => {
        return this.professionalServices.getSkills().pipe(
          map((skills: Skill[]) => new SetSkills(skills)),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining your skills list!')))
          )
        );
      })
    );

  constructor(
    private actions$: Actions,
    private professionalServices: ProfessionalServices,
    private toast: ToasterService
  ) {}
}
