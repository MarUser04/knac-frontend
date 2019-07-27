import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import * as AssessmentActions from '../../../../actions/assessments.actions';
import * as fromAssessment from '@app/shared/reducers';
import * as CompanyActions from '@app/shared/actions/company-profile.actions';
import * as trackActions from '@app/shared/actions/track.actions';
import * as skillsActions from '@app/shared/actions/skills.actions';
import * as Templates from '../../../../actions/assessments.actions';
import * as fromTemplates from '../../../../reducers';
import * as fromPage from '../../../../reducers';
import * as fromCompany from '../../../../reducers';
import { Assessment } from '@app/shared/models/assessment';

@Component({
  selector: 'cmp-assesment-create-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="select">
      <cmp-assessment-create
        *ngSwitchCase="1"
        [tracks]="tracks$ | async"
        [skills]="skills$ | async"
        [setPreView]="preView"
        [action]="action"
        (view)="changesView($event)"
        (data)="setDataFirstView($event)"
      ></cmp-assessment-create>
      <cmp-assessment-create-description
        *ngSwitchCase="2"
        [preView]="preView"
        [templates]="templates$ | async"
        (back)="changesView($event)"
        (view)="changesView($event)"
        (data)="setDataSecondView($event)"
      ></cmp-assessment-create-description>
      <cmp-assessment-create-preview
        *ngSwitchCase="3"
        (back)="changesView($event)"
        [preView]="preView"
        (submited)="sendData()"
        [action]="action"
        [tracks]="tracks$ | async"
        [skills]="skills$ | async"
        [disabled]="loading$ | async"
      ></cmp-assessment-create-preview>
      <cmp-assessment-create-success
        *ngSwitchCase="4"
      ></cmp-assessment-create-success>
    </div>
  `
})
export class AssesmentCreateContainerComponent implements OnInit {
  select = 1;
  action = 'create';
  tracks$: any;
  skills$: any;
  templates$: any;
  preView: any = {
    name: '',
    durationInMinutes: null,
    question: '',
    isFile: null,
    template: null,
    track: null,
    type: null,
    skills: null
  };
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromCompany.CompanyState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    store.dispatch(new trackActions.GetTrackList());
    store.dispatch(new skillsActions.GetSkillsList());
    store.dispatch(new Templates.GetTemplate());
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
    this.templates$ = store.pipe(select(fromTemplates.getTemplates));
    this.loading$ = store.pipe(select(fromPage.getPending));
    this.skills$ = store.pipe(select(fromAssessment.getSkillsList));
  }

  changesView(index) {
    this.select = index;
  }

  setDataFirstView({ name, durationInMinutes, track, isFile, skills }) {
    this.preView = {
      ...this.preView,
      name,
      track,
      isFile,
      durationInMinutes,
      skills
    };
  }

  setDataSecondView({ question, type, template }) {
    this.preView = {
      ...this.preView,
      question,
      type,
      template
    };
  }

  sendData() {
    this.store.dispatch(new AssessmentActions.CreateAssessments(this.preView));
  }

  ngOnInit() {}
}
