import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as AssessmentActions from '../../../../actions/assessments.actions';
import * as fromAssessment from '../../../../reducers';
import { Assessment } from '@app/shared/models/assessment';

@Component({
  selector: 'app-assessment-list-container',
  template: `
    <prf-assessments-list
      [assessmentsCompleted]="assessmentsCompleted$ | async"
      [assessmentsNotCompleted]="assessmentsNotCompleted$ | async"
    >
    </prf-assessments-list>
  `
})
export class AssessmentsListContainerComponent implements OnInit {
  assessmentsCompleted$: Observable<Assessment[]>;
  assessmentsNotCompleted$: Observable<Assessment[]>;

  constructor(private store: Store<fromAssessment.State>) {
    store.dispatch(new AssessmentActions.GetAssessments());
    store.dispatch(new AssessmentActions.GetCompletedAssessments());
    // this.assessments$ = store.pipe(select(fromAssessment.getAssessmentsList));
    this.assessmentsNotCompleted$ = store.pipe(
      select(fromAssessment.getNotCompletedAssessments)
    );
    this.assessmentsCompleted$ = store.pipe(
      select(fromAssessment.getCompletedAssessments)
    );
  }

  ngOnInit() {}
}
