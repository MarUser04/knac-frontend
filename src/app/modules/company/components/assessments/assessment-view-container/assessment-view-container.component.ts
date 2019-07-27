import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import * as AssessmentActions from '../../../actions/assessments.actions';
import * as fromAssessment from '@app/shared/reducers';
import * as CompanyActions from '@app/modules/company/actions/assessments.actions';
import * as trackActions from '@app/shared/actions/track.actions';
import * as Templates from '../../../actions/assessments.actions';
import * as skillsActions from '@app/shared/actions/skills.actions';
import * as fromTemplates from '../../../reducers';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Assessment } from '@app/shared/models/assessment';

@Component({
  selector: 'cmp-assesment-create-container',
  template: `
    <div>
      <cmp-assessment-preview
        [preView]="preView$ | async"
        [action]="'edit'"
        [skills]="skills$ | async"
        (delete)="deleteAssessmentById()"
      ></cmp-assessment-preview>

      <!--
        <swal
          #redirectSwal
          title="The Assessment Was Deleted"
          text=""
          type="success"AQUI
          timer="3000"
          (close)="redirect()">
        </swal>
      -->
    </div>
  `
})
export class AssessmentViewContainerComponent implements OnInit {
  tracks$: any;
  templates$: any;
  skills$: any;
  preView$: Observable<Assessment>;
  id: string;

  constructor(
    private store: Store<fromAssessment.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    store.dispatch(new trackActions.GetTrackList());
    store.dispatch(new Templates.GetTemplate());
    store.dispatch(new skillsActions.GetSkillsList());

    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
    this.templates$ = store.pipe(select(fromTemplates.getTemplates));
    this.skills$ = store.pipe(select(fromAssessment.getSkillsList));

    this.id = this.activatedRoute.snapshot.params.id;
    const action = this.activatedRoute.snapshot.data['action'];
    if (this.id) {
      store.dispatch(new CompanyActions.GetCompanyAssessmentByID(this.id));
      this.preView$ = store.pipe(
        select(fromAssessment.getCompanyAssessmentByID)
      );
    }
  }

  @ViewChild('redirectSwal')
  private redirectSwal: SwalComponent;

  ngOnInit() {}

  deleteAssessmentById(): void {
    this.store.dispatch(new Templates.DeleteAssessmentByID(this.id));
    this.redirectSwal.show();
  }

  redirect(): void {
    this.router.navigate(['/company/assessments']);
  }
}
