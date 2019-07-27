import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToasterService } from 'angular2-toaster';

import * as skillsActions from '@app/shared/actions/skills.actions';
import * as fromAssessment from '@app/shared/reducers';
import * as CompanyActions from '@app/shared/actions/company-profile.actions';
import { Assessment } from '@app/shared/models/assessment';
import * as AssessmentActions from '@app/modules/professional/actions/assessments.actions';
import * as fromAssessmentProfessional from '@app/modules/professional/reducers';
import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { warnToast } from '@app/helpers/helper';

@Component({
  selector: 'app-assessment-edition-container',
  styleUrls: ['./assessment-edition-container.component.css'],
  template: `
    <div class="container">
      <prf-assessment-form
        [preView]="preView$ | async"
        (submited)="takeAssessment()"
        (submittedAssessment)="submittedAssessment($event)"
        (onTimeFinished)="timeIsOver()"
        [pendingProcessingAssessment]="loading$ | async"
        [taking]="taking$ | async"
        [assessmentExpiration]="assessmentExpiration$ | async"
        [skills]="skills$ | async"
        [showWarningModal]="take"
      ></prf-assessment-form>
    </div>
  `
})
export class AssessmentEditionContainerComponent implements OnInit {
  preView$: Observable<Assessment>;
  action = 'professional';

  loading$: Observable<boolean>;
  taking$: Observable<boolean>;
  assessmentTaked$: Observable<Assessment>;
  assessmentExpiration$: Observable<string>;
  skills$: any;

  id: string;
  take: boolean = false;

  @ViewChild(AssessmentFormComponent) child: AssessmentFormComponent;

  constructor(
    private store: Store<fromAssessment.State>,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private toast: ToasterService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      store.dispatch(new CompanyActions.GetAssessmentByID(this.id));
      this.preView$ = store.pipe(
        select(fromAssessment.getCompanyAssessmentByID)
      );
    }

    store.dispatch(new skillsActions.GetSkillsList());
    this.skills$ = store.pipe(select(fromAssessment.getSkillsList));

    this.loading$ = store.pipe(
      select(fromAssessmentProfessional.getPendingProcessingAssessment)
    );

    this.taking$ = store.pipe(
      select(fromAssessmentProfessional.getTakingPendingProcessingAssessment)
    );

    this.assessmentExpiration$ = this.store.pipe(
      select(fromAssessmentProfessional.getAssessmentExpiration)
    );
  }

  ngOnInit() {}

  takeAssessment() {
    this.store.dispatch(new AssessmentActions.TakeAssessment(this.id));
  }

  submittedAssessment(data) {
    const payload = { id: this.id, data };
    this.store.dispatch(new AssessmentActions.SubmitAssessment(payload));
  }

  timeIsOver() {
    this.store.dispatch(
      new AssessmentActions.TakingPendingProcessingAssessment()
    );
    this.toast.pop(warnToast('Time has run out on this assessment'));
    this.router.navigate(['/professional/assessments']);
  }

  canDeactivate() {
    this.store
      .select(fromAssessmentProfessional.getTakingPendingProcessingAssessment)
      .subscribe(take => (this.take = take));

    if (this.take) {
      this.child.showWarning = true;
      return this.child.take;
    } else {
      return true;
    }
  }
}
