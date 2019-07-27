import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';

import { Company } from '../../../models/company';
import * as CompanyActions from '../../../actions/company.actions';
import * as PageActions from '../../../actions/page.actions';
import * as fromCompany from '../../../reducers';
import * as fromPage from '../../../reducers';

@Component({
  selector: 'adm-company-list-container',
  template: `<adm-company-list
              [companies]="companies$ | async"
              [loading]="loading$ | async"
              [modalCreate]="modalCreate$ | async"
              [modalUpdate]="modalUpdate$ | async"
              (update)="onUpdateCompany($event)"
              (create)="createCompanyById($event)"
              (createManually)="createCompanyManually($event)"
              (delete)="deleteCompanyById($event)"
              (submitted)="updateList()"
             ></adm-company-list>`,
  styleUrls: ['./company-list-container.component.css'],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class CompanyListContainerComponent implements OnInit {
  companies$: Observable<Company>;
  companies: Company[];
  loading$: Observable<boolean>;
  modalCreate$: Observable<boolean>;
  modalUpdate$: Observable<boolean>;

  constructor(private store: Store<fromCompany.State>) {
    this.companies$ = store.pipe(select(fromCompany.getCompanies));
    this.loading$ = store.pipe(select(fromPage.getLoading));
    this.modalCreate$ = store.pipe(select(fromPage.getModalCreateToggle));
    this.modalUpdate$ = store.pipe(select(fromPage.getModalUpdateToggle));
  }

  ngOnInit(): void {
    this.store.dispatch(new CompanyActions.GetCompanies());
  }

  onUpdateCompany(company: Company) {
    this.store.dispatch(new CompanyActions.UpdateCompany(company));
  }

  createCompanyById({ _id: id }) {
    this.store.dispatch(new CompanyActions.CreateCompany(id));
  }

  createCompanyManually({ _id, ...data }) {
    this.store.dispatch(new CompanyActions.CreateCompanyManually(data));
  }

  deleteCompanyById({ _id: id }) {
    this.store.dispatch(new CompanyActions.DeleteCompany(id));
  }

  updateList() {
    this.store.dispatch(new CompanyActions.GetCompanies());
  }
}
