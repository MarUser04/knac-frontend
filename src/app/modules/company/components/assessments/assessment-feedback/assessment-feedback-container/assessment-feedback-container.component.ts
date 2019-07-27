import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Questions } from '@app/modules/company/models/questions';
import * as fromAssessment from '@app/modules/company/reducers';
import * as fromQuestions from '@app/modules/company/reducers';
import * as CompanyActions from '@app/modules/company/actions/assessments.actions';
import * as QuestionsActions from '@app/modules/company/actions/questions.actions';
import * as fromCompany from '@app/modules/company/reducers';
import * as CompanyProfileActions from '@app/modules/company/actions/company.actions';
import * as fromCompanyShared from '@app/shared/reducers';

@Component({
  selector: 'cmp-assessment-feedback-container',
  template: `
    <cmp-assessment-feedback
      [questions]="questions$ | async"
      [id]="id"
      [ids]="ids"
      [loading]="loading$ | async"
      [company]="company$ | async"
      (submitted)="sendFeedback($event)"
    ></cmp-assessment-feedback>
  `
})
export class AssessmentFeedbackContainerComponent implements OnInit {
  questions$: Observable<Questions>;
  loading$: Observable<boolean>;
  id: string;
  ids: string;
  company$: Observable<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromAssessment.CompanyState>
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.ids = this.activatedRoute.snapshot.params.idS;
    const payload = {
      id: this.id,
      ids: this.ids
    };
    store.dispatch(new QuestionsActions.GetQuestions());
    this.questions$ = store.pipe(select(fromQuestions.getQuestions));
    this.company$ = store.pipe(select(fromQuestions.getProfile));
    this.loading$ = this.store.pipe(
      select(fromQuestions.getTogglePendingProcessingQuestions)
    );
  }

  ngOnInit() {}

  sendFeedback(data) {
    const payload = {
      id: this.id,
      idS: this.ids,
      data
    };
    this.store.dispatch(new QuestionsActions.PostFeedback(payload));
  }
}
