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
  GetTemplates,
  SetTemplates,
  CreateTemplate,
  UpdateTemplate,
  DeleteTemplate,
  TemplateActionTypes
} from '../actions/template.actions';
import {
  Pending,
  Loading,
  ModalCreateToggle,
  ModalUpdateToggle
} from '../actions/page.actions';
import { AppError } from '@app/state/app-actions';
import { AdminService } from '@app/services/admin/admin.service';
import { warnToast, successToast } from '@app/helpers/helper';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';
import { Template } from '@app/modules/admin/models/template';

@Injectable()
export class TemplateEffects {
  @Effect()
  updateTemplate$: Observable<Action> = this.actions$
    .ofType<UpdateTemplate>(TemplateActionTypes.UpdateTemplate)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalUpdateToggle())),
      map(action => action.payload),
      exhaustMap(data => {
        return this.admin.updateTemplateById(data).pipe(
          tap(() => this.toast.pop(successToast('Template Updated!'))),
          map((template: Template) => new GetTemplates()),
          catchError(err =>
            of(this.toast.pop(warnToast('Error updating your Template!')))
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
  createTemplate$: Observable<Action> = this.actions$
    .ofType<CreateTemplate>(TemplateActionTypes.CreateTemplate)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Loading())),
      tap(() => this.store.dispatch(new ModalCreateToggle())),
      exhaustMap(data =>
        this.admin.createTemplate(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Template Created!'))),
          map((template: Template) => new GetTemplates()),
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
  deleteTemplate$: Observable<Action> = this.actions$
    .ofType<DeleteTemplate>(TemplateActionTypes.DeleteTemplate)
    .pipe(
      map(action => action.payload),
      tap(() => this.store.dispatch(new Pending())),
      exhaustMap(data =>
        this.admin.deleteTemplateById(data).pipe(
          delay(500),
          tap(() => this.toast.pop(successToast('Template Deleted!'))),
          map(template => new GetTemplates()),
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
  getTemplate$: Observable<Action> = this.actions$
    .ofType<GetTemplates>(TemplateActionTypes.GetTemplates)
    .pipe(
      tap(() => this.store.dispatch(new Loading())),
      exhaustMap(() => {
        return this.admin.getTemplates().pipe(
          map((tamplate: Template[]) => new SetTemplates(tamplate)),
          catchError(err =>
            of(this.toast.pop(warnToast('Error obtaining your template list!')))
          ),
          finalize(() => this.store.dispatch(new Loading()))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private admin: AdminService,
    private message: HandleErrorService,
    private store: Store<Template>,
    private toast: ToasterService
  ) {}
}
