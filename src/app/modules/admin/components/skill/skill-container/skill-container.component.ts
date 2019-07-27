import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
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
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/defer';

import * as fromskill from '../../../reducers';
import * as fromPage from '../../../reducers';
import * as skillActions from '../../../actions/skill.actions';
import * as PageActions from '../../../actions/page.actions';
import { Skill } from '../../../models/skill';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '@app/services/admin/admin.service';
import { errorToast } from '@app/helpers/helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'adm-skill-container',
  template: `
    <adm-skill
      [skills]="skills$ | async"
      [loading]="loading$ | async"
      [modalCreate]="modalCreate$ | async"
      [modalUpdate]="modalUpdate$ | async"
      (create)="createSkill($event)"
      (update)="onUpdateSkill($event)"
      (delete)="deleteSkillById($event)"
    ></adm-skill>
  `
})
export class SkillContainerComponent implements OnInit, OnDestroy {
  skills$: Observable<any>;
  loading$: Observable<boolean>;
  modalCreate$: Observable<boolean>;
  modalUpdate$: Observable<boolean>;
  unsubscribeDelete;

  constructor(
    private store: Store<fromskill.State>,
    private admin: AdminService,
    private toast: ToasterService
  ) {
    this.skills$ = store.pipe(select(fromskill.getSkills));
    this.loading$ = store.pipe(select(fromPage.getLoading));
    this.modalCreate$ = store.pipe(select(fromPage.getModalCreateToggle));
    this.modalUpdate$ = store.pipe(select(fromPage.getModalUpdateToggle));
  }

  ngOnInit(): void {
    this.store.dispatch(new skillActions.GetSkills());
  }

  ngOnDestroy() {}

  createSkill({ name }: Skill) {
    this.store.dispatch(new skillActions.CreateSkill({ name }));
  }

  onUpdateSkill(skill: Skill) {
    this.store.dispatch(new skillActions.UpdateSkill(skill));
  }

  deleteSkillById({ _id: id }) {
    this.unsubscribeDelete = Observable.defer(() => {
      return this.admin.checkSkillsOrTrack({ name: 'skill', id });
    })
      .finally(() => {})
      .subscribe({
        next: ({ skills }) => {
          if (skills) {
            this.store.dispatch(new skillActions.DeleteSkill(id));
          } else {
            this.toast.pop(
              errorToast('The skill you want to delete is being used')
            );
          }
        },
        error: (error: HttpErrorResponse) => {
          this.toast.pop(errorToast(error.message));
        }
      });
  }
}
