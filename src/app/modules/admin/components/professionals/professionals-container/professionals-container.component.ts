import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as ProfessionalList from '../../../actions/professionals.actions';
import * as fromProfessionalList from '../../../reducers';
import * as AdminAction from '../../../actions/admin.actions';

@Component({
  selector: 'adm-professional-list',
  template: `
    <adm-professionals
      [professionals]="professionals$ | async"
      (disabledEnabled)="disabledEnabled($event)"
      (deleteCompanyById)="deleteCompanyById($event)"
    >
    </adm-professionals>
  `
})
export class ProfessionalsContainerComponent implements OnInit {
  professionals$: Observable<any>;
  module: String;

  constructor(
    private store: Store<fromProfessionalList.AdminState>,
    private route: Router
  ) {
    store.dispatch(new ProfessionalList.GetProfessionals());
    this.professionals$ = store.pipe(
      select(fromProfessionalList.getProfessionals)
    );
  }

  ngOnInit(): void {}

  disabledEnabled(id) {
    this.store.dispatch(
      new AdminAction.DisableEnableUsers({ id, type: AdminAction.PROFESSIONAL })
    );
  }

  deleteCompanyById(id: string) {
    this.store.dispatch(
      new AdminAction.DeleteCompanyById({ id, type: AdminAction.PROFESSIONAL })
    );
  }
}
