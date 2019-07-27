import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as fromCompany from '../../../reducers';
import * as CompanyAction from '../../../actions/company.actions';

@Component({
  selector: 'prf-company-list-container',
  template: `
    <prf-company-list [companies]="companies | async"></prf-company-list>
  `
})
export class CompanyListContainerComponent implements OnInit {
  companies: Observable<any[]>;

  constructor(private store: Store<fromCompany.State>) {
    store.dispatch(new CompanyAction.GetCompanies());
    this.companies = store.pipe(select(fromCompany.getCompanies));
  }

  ngOnInit() {}
}
