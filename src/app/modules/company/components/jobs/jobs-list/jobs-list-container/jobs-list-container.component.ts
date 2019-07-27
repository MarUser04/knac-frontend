import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as JobsActions from '@app/modules/company/actions/jobs.actions';
import * as fromJobs from '@app/modules/company/reducers';
import * as fromAssessment from '@app/shared/reducers';
import * as trackActions from '@app/shared/actions/track.actions';
import { Job } from '@app/modules/company/models/job';

@Component({
  selector: 'app-jobs-list-container',
  template: `
     <cmp-jobs-list
        [jobs]="jobs$ | async"
        [tracks]="tracks$ | async"
      ></cmp-jobs-list>
  `
})
export class JobsListContainerComponent implements OnInit {
  jobs$: Observable<Job[]>;
  tracks$: Observable<any>;

  constructor(private store: Store<fromJobs.CompanyState>) {
    store.dispatch(new JobsActions.GetJobs());
    store.dispatch(new trackActions.GetTrackList());
    this.jobs$ = store.pipe(select(fromJobs.getJobs));
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
  }

  ngOnInit() {}
}
