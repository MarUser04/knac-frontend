import { Component, OnInit } from '@angular/core';

import * as AssessmentActions from '@app/modules/professional/actions/assessments.actions';
import * as fromAssessmentProfessional from '@app/modules/professional/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'prf-assessment-feedback-container',
  template: `
    <prf-assessment-feedback
      [feedback]="feedback$ | async"
      [questions]="questions$ | async"
    ></prf-assessment-feedback>
  `
})
export class AssessmentFeedbackContainerComponent implements OnInit {
  id: string;
  feedback$: Observable<any>;
  questions$: Observable<any>;

  constructor(
    private store: Store<fromAssessmentProfessional.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params.id;

    store.dispatch(new AssessmentActions.GetFeedbackByAssessment(this.id));
    this.feedback$ = store.pipe(
      select(fromAssessmentProfessional.getFeedbackAssessments)
    );

    store.dispatch(new AssessmentActions.GetQuestions());
    this.questions$ = store.pipe(
      select(fromAssessmentProfessional.getQuestions)
    );
  }

  ngOnInit() {}
}
