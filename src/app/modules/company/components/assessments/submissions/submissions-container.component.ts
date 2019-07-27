import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Assessment } from '../../../models/assessment';
import { Questions } from '@app/modules/company/models/questions';
import * as fromAssessment from '@app/modules/company/reducers';
import * as fromQuestions from '@app/modules/company/reducers';
import * as CompanyActions from '../../../actions/assessments.actions';
import * as QuestionsActions from '@app/modules/company/actions/questions.actions';
import * as fromCompany from '@app/modules/company/reducers';
import * as CompanyProfileActions from '../../../actions/company.actions';
import * as skillsActions from '@app/shared/actions/skills.actions';
import * as fromShared from '@app/shared/reducers';

@Component({
  selector: 'cmp-submissions',
  template: `
    <app-submissions-view
      [assessment]="assessment$ | async"
      [questions]="questions$ | async"
      [isLoading]="loading$ | async"
      [modalFeedback]="modalFeedback$ | async"
      [skills]="skills$ | async"
      [action]="action"
    ></app-submissions-view>
  `
})
export class SubmissionsContainerComponent implements OnInit {
  id: string;
  ids: string;
  assessment$: Observable<Assessment>;
  questions$: Observable<Questions>;
  loading$: Observable<boolean>;
  modalFeedback$: Observable<boolean>;
  action: string;
  skills$: Observable<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromAssessment.CompanyState>
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.ids = this.activatedRoute.snapshot.params.idS;
    this.action = this.activatedRoute.snapshot.data['action'];
    const payload = {
      id: this.id,
      ids: this.ids
    };

    store.dispatch(new CompanyActions.GetCompanyAssessmentSubmissions(payload));
    this.assessment$ = store.pipe(
      select(fromAssessment.getAssessmentSubmissions)
    );
    if (this.action === 'professional') {
      store.dispatch(new skillsActions.GetSkillsList());
      this.skills$ = store.pipe(select(fromShared.getSkillsList));
    }

    // this.store.dispatch(new QuestionsActions.GetQuestions());
    // this.questions$ = this.store.pipe(select(fromQuestions.getQuestions));
    // this.loading$ = this.store.pipe(
    //   select(fromQuestions.getTogglePendingProcessingQuestions)
    // );
    // this.modalFeedback$ = store.pipe(
    //   select(fromQuestions.getModalFeedbackToggle)
    // );
  }
  ngOnInit() {}

  // sendFeedback({ idS, data }) {
  //   const payload = {
  //     id: this.id,
  //     idS,
  //     data
  //   };
  //   this.store.dispatch(new QuestionsActions.PostFeedback(payload));
  // }
}
