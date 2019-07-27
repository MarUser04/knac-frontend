import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromProfessional from '../../../reducers';
import * as ProfessionalActions from '../../../actions/professional.actions';

@Component({
  selector: 'prf-update-password-container',
  template: `
    <prf-update-password
      [loading]="loading$ | async"
      (submitted)="updatePassword($event)"
    ></prf-update-password>
  `
})
export class UpdatePasswordContainerComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private store: Store<fromProfessional.ProfessionalState>) {
    this.loading$ = store.pipe(
      select(fromProfessional.getPendingUpdatePassword)
    );
  }

  ngOnInit() {}

  updatePassword(data) {
    this.store.dispatch(
      new ProfessionalActions.UpdatePasswordProfessional(data)
    );
  }
}
