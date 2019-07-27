import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../../reducers';
import * as CompanyAction from '../../../actions/companies.actions';
import * as AdminAction from '../../../actions/admin.actions';

@Component({
  selector: 'adm-companies-container',
  template: `
    <adm-companies
      [companies]="companies | async"
      [loading]="loading | async"
      [toggle]="toggle | async"
      (update)="updateEmail($event)"
      (disabledEnabled)="disabledEnabled($event)"
      (deleteCompanyById)="deleteCompanyById($event)"
    ></adm-companies>
  `
})
export class CompaniesContainerComponent implements OnInit {
  companies: Observable<any>;
  loading: Observable<boolean>;
  toggle: Observable<boolean>;

  constructor(private store: Store<fromCompany.State>) {
    store.dispatch(new CompanyAction.GetCompanyList());
    this.companies = store.pipe(select(fromCompany.getCompanyList));
    this.loading = store.pipe(select(fromCompany.getLoading));
    this.toggle = store.pipe(select(fromCompany.getModalUpdateToggle));
  }

  ngOnInit() {}

  updateEmail(data) {
    this.store.dispatch(new CompanyAction.UpdateEmail(data));
  }

  disabledEnabled(id) {
    this.store.dispatch(
      new AdminAction.DisableEnableUsers({ id, type: AdminAction.COMPANY })
    );
  }

  deleteCompanyById(id: string) {
    this.store.dispatch(
      new AdminAction.DeleteCompanyById({ id, type: AdminAction.COMPANY })
    );
  }
}
