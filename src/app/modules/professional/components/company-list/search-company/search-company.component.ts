import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromProfessional from '@app/modules/professional/reducers';
import * as companyActions from '@app/modules/professional/actions/company.actions';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss']
})
export class SearchCompanyComponent implements OnInit {
  searchField: FormControl;

  constructor(private store: Store<fromProfessional.State>) {
    this.searchField = new FormControl();
  }

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(term => {
          return of(
            this.store.dispatch(new companyActions.SearchCompany(term))
          );
        })
      )
      .subscribe(term => term);
  }
}
