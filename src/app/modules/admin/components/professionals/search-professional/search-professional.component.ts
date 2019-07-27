import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAdmin from '@app/modules/admin/reducers';
import * as professionalActions from '@app/modules/admin/actions/professionals.actions';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'search-professional-admin',
  templateUrl: './search-professional.component.html',
  styleUrls: ['./search-professional.component.scss']
})
export class SearchProfessionalComponent implements OnInit {
  searchField: FormControl;
  selectField: FormControl;

  select = ['name', 'lastName'];

  constructor(private store: Store<fromAdmin.AdminState>) {
    this.searchField = new FormControl();
    this.selectField = new FormControl(this.select[0]);
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
                  new professionalActions.SearchProfessionalsAdmin(term)
                )
              )
            : of(term);
        })
      )
      .subscribe(term => term);
  }
}
