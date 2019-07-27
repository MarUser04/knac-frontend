import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAdmin from '@app/modules/admin/reducers';
import * as CompaniesActions from '@app/modules/admin/actions/companies.actions';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'search-company-admin',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss']
})
export class SearchCompanyComponent implements OnInit {
  searchField: FormControl;

  constructor(private store: Store<fromAdmin.AdminState>) {
    this.searchField = new FormControl();
  }

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(term => {
          return term
            ? of(
                this.store.dispatch(
                  new CompaniesActions.SearchCompanyAdmin(term)
                )
              )
            : of(this.store.dispatch(new CompaniesActions.GetCompanyList()));
        })
      )
      .subscribe(term => term);
  }
}
