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
  GetSkills,
  SetSkills,
  CreateSkill,
  UpdateSkill,
  DeleteSkill,
  SkillsActionTypes
} from '../actions/skill.actions';
import {
  Pending,
  Loading,
  ModalCreateToggle,
  ModalUpdateToggle
} from '../actions/page.actions';
import { AppError } from '@app/state/app-actions';
import { AdminService } from '@app/services/admin/admin.service';
import { warnToast, successToast } from '@app/helpers/helper';
import { Skill } from '../models/skill';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class SkillEffects {
  @Effect()
  updateSkill$: Observable<Action> = this.actions$
    .ofType<UpdateSkill>(SkillsActionTypes.UpdateSkill)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalUpdateToggle())),
      map(action => action.payload),
      exhaustMap(data => {
        return this.admin.updateSkillById(data).pipe(
          tap(() => this.toast.pop(successToast('Skill Updated!'))),
          map((skill: Skill) => new GetSkills()),
          catchError(err =>
            of(this.toast.pop(warnToast('Error updating your Skill!')))
          ),
          finalize(() => {
            this.store.dispatch(new Loading());
            delay(300);
            this.store.dispatch(new ModalUpdateToggle());
          })
        );
      })
    );

  @Effect()
  createSkill$: Observable<Action> = this.actions$
    .ofType<CreateSkill>(SkillsActionTypes.CreateSkill)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalCreateToggle())),
      exhaustMap(data =>
        this.admin.createSkill(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Skill Created!'))),
          map(company => new GetSkills()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            this.store.dispatch(new Loading());
            delay(800);
            this.store.dispatch(new ModalCreateToggle());
          })
        )
      )
    );

  @Effect()
  deleteSkill$: Observable<Action> = this.actions$
    .ofType<DeleteSkill>(SkillsActionTypes.DeleteSkill)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Pending())),
      exhaustMap(data =>
        this.admin.deleteSkillById(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Skill Deleted!'))),
          map(company => new GetSkills()),
          catchError(({ error }) => {
            this.message.showAlertMssg(error);
            return of(new AppError('Check form instructions!'));
          }),
          finalize(() => {
            delay(300);
            this.store.dispatch(new Pending());
          })
        )
      )
    );

  @Effect()
  getSkills$: Observable<Action> = this.actions$
    .ofType<GetSkills>(SkillsActionTypes.GetSkills)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      exhaustMap(() => {
        return this.admin.getSkills().pipe(
          map((skills: Skill[]) => new SetSkills(skills)),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining your skills list!')))
          ),
          finalize(() => this.store.dispatch(new Loading()))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private admin: AdminService,
    private message: HandleErrorService,
    private store: Store<Skill>,
    private toast: ToasterService
  ) {}
}
