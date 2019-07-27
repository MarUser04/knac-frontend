import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromCompany from '../../../reducers';
import * as CompanyActions from '../../../actions/company.actions';

@Component({
  selector: 'cmp-update-password-container',
  template: `
    <cmp-update-password
      [loading]="loading$ | async"
      (submitted)="update($event)"
    ></cmp-update-password>
  `
})
export class UpdatePasswordContainerComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private store: Store<fromCompany.CompanyState>) {
    this.loading$ = store.pipe(select(fromCompany.getPending));
  }

  ngOnInit() {}

  update(data) {
    this.store.dispatch(new CompanyActions.UpdatePassword(data));
  }
}
