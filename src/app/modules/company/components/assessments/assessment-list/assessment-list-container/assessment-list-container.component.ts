import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as AssessmentActions from '@app/shared/actions/company-profile.actions';
import * as fromAssessment from '@app/shared/reducers';
import { Assessment } from '@app/shared/models/assessment';

@Component({
  selector: 'app-assessment-list-container',
  template: `
    <cmp-assessment-list [assessments]="assessments$ | async"></cmp-assessment-list>
  `
})
export class AssessmentListContainerComponent implements OnInit {
  assessments$: Observable<Assessment>;

  constructor(private store: Store<fromAssessment.State>) {
    store.dispatch(new AssessmentActions.GetCompanyAssessments());
    this.assessments$ = store.pipe(select(fromAssessment.getCompanyAssessment));
  }

  ngOnInit() {}
}
