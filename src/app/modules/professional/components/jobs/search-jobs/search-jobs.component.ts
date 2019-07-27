import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromJobs from '@app/modules/professional/reducers';
import * as JobActions from '@app/modules/professional/actions/jobs.actions';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit {
  searchField: FormControl;

  constructor(private store: Store<fromJobs.ProfessionalState>) {
    this.searchField = new FormControl();
  }

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(term => {
          if (term === '') {
            of(this.store.dispatch(new JobActions.GetJobs()));
            return of(this.store.dispatch(new JobActions.GetJobsApplied()));
          } else {
            return term
              ? of(this.store.dispatch(new JobActions.SearchJob(term)))
              : of(term);
          }
        })
      )
      .subscribe(term => term);
  }
}
