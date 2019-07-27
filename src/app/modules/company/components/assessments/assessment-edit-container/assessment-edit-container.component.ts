import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import * as AssessmentActions from '../../../actions/assessments.actions';
// import { Assessment } from '../../../models/assessment';
import * as fromAssessment from '@app/shared/reducers';
import * as CompanyActions from '@app/shared/actions/company-profile.actions';
import * as trackActions from '@app/shared/actions/track.actions';
import * as skillsActions from '@app/shared/actions/skills.actions';
import * as Templates from '../../../actions/assessments.actions';
import * as fromTemplates from '../../../reducers';
import * as fromPage from '../../../reducers';
import * as fromCompany from '../../../reducers';
import { Assessment } from '@app/shared/models/assessment';

@Component({
  selector: 'cmp-assesment-create-container',
  template: `
    <div [ngSwitch]="select">
      <cmp-assessment-create
        *ngSwitchCase="1"
        [tracks]="tracks$ | async"
        [skills]="skills$ | async"
        [setPreView]="preView$ | async"
        [action]="action"
        (view)="changesView($event)"
        (data)="setDataFirstView($event)"
      ></cmp-assessment-create>
      <cmp-assessment-create-description
        *ngSwitchCase="2"
        [preView]="newPreview"
        [templates]="templates$ | async"
        (back)="changesView($event)"
        (view)="changesView($event)"
        (data)="setDataSecondView($event)"
      ></cmp-assessment-create-description>
      <cmp-assessment-create-preview
        *ngSwitchCase="3"
        (back)="changesView($event)"
        [preView]="newPreview"
        [tracks]="tracks$ | async"
        (submited)="sendData()"
        [action]="action"
        [disabled]="loading$ | async"
        [skills]="skills$ | async"
      ></cmp-assessment-create-preview>
      <cmp-assessment-create-success
        *ngSwitchCase="4"
      ></cmp-assessment-create-success>
    </div>
  `
})
export class AssessmentEditContainerComponent implements OnInit {
  id: string;
  select = 1;
  action = 'update';
  tracks$: any;
  skills$: Observable<any>;
  templates$: Observable<any>;
  preView$: Observable<any>;
  newPreview: any = {
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
    store.dispatch(new Templates.GetTemplate());
    store.dispatch(new skillsActions.GetSkillsList());
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
    this.skills$ = store.pipe(select(fromAssessment.getSkillsList));
    this.templates$ = store.pipe(select(fromTemplates.getTemplates));
    this.loading$ = store.pipe(select(fromPage.getPending));
    this.id = this.activatedRoute.snapshot.params.id;
    const action = this.activatedRoute.snapshot.data['action'];
    if (this.id) {
      store.dispatch(new CompanyActions.GetAssessmentByID(this.id));
      this.preView$ = store.pipe(
        select(fromAssessment.getCompanyAssessmentByID)
      );
    }
  }

  changesView(index) {
    this.select = index;
  }

  setDataFirstView({ name, durationInMinutes, track, isFile, skills }) {
    this.preView$.subscribe(obj => {
      this.newPreview = obj;
    });

    this.newPreview = {
      ...this.newPreview,
      name,
      track,
      isFile,
      durationInMinutes,
      skills
    };
  }

  setDataSecondView({ question, type, template }) {
    this.newPreview = {
      ...this.newPreview,
      question,
      type,
      template
    };
  }

  sendData() {
    this.store.dispatch(
      new AssessmentActions.UpdateAssessment({
        id: this.id,
        body: this.newPreview
      })
    );
  }

  ngOnInit() {}
}
