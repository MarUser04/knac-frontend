import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromAdmin from '../../../reducers';
import * as AdminActions from '../../../actions/admin.actions';

@Component({
  selector: 'adm-update-password-container',
  template: `
    <adm-update-password
      [loading]="loading$ | async"
      (submitted)="update($event)"
    ></adm-update-password>
  `
})
export class UpdatePasswordContainerComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private store: Store<fromAdmin.AdminState>) {
    this.loading$ = this.store.pipe(select(fromAdmin.getLoading));
  }

  ngOnInit() {}

  update(data) {
    this.store.dispatch(new AdminActions.UpdatePassword(data));
  }
}
