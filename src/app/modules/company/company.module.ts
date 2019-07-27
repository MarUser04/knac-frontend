import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarRatingModule } from 'ngx-bar-rating';

import { SharedModule } from '../../shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';
import { HomeComponent } from './components/home/home.component';
import { JobPreviewComponent } from '../../components/jobs/job-preview/job-preview.component';
import { AssessmentListComponent } from './components/assessments/assessment-list/assessment-list/assessment-list.component';
import { AssessmentListContainerComponent } from './components/assessments/assessment-list/assessment-list-container/assessment-list-container.component';
import { CustomInterceptorService } from '@app/services/customInterceptor/customInterceptor.service';
import { PasswordSetupContainerComponent } from './components/password-setup/password-setup-container/password-setup-container.component';
import { PasswordSetupComponent } from './components/password-setup/password-setup/password-setup.component';
import { CompanyEffects } from '@app/modules/company/effects/company.effects';
import { AssessmentEffects } from '@app/modules/company/effects/assessment.effects';
import { QuestionsEffects } from '@app/modules/company/effects/questions.effects';
import { reducers } from './reducers';
import { CompanyService } from '@app/services/company/company.service';
import { AssessmentCreateComponent } from '@app/modules/company/components/assessments/assessment-create/assessment-create/assessment-create.component';
import { AssesmentCreateContainerComponent } from '@app/modules/company/components/assessments/assessment-create/assesment-create-container/assesment-create-container.component';
import { AssessmentEditContainerComponent } from '@app/modules/company/components/assessments/assessment-edit-container/assessment-edit-container.component';
import { AssessmentCreateDescriptionComponent } from './components/assessments/assessment-create/assessment-create-description/assessment-create-description.component';
import { AssessmentCreateSuccessComponent } from './components/assessments/assessment-create/assessment-create-success/assessment-create-success.component';
import { AssessmentViewContainerComponent } from '@app/modules/company/components/assessments/assessment-view-container/assessment-view-container.component';
import { UpdateProfileComponent } from './components/profile/update/update-profile/update-profile.component';
import { UpdateProfileContainerComponent } from './components/profile/update/update-profile-container/update-profile-container.component';
import { HomeGuardService } from '@app/modules/company/guards/home/home-guard.service';
import { SubmissionsContainerComponent } from './components/assessments/submissions/submissions-container.component';
import { SubmissionsViewComponent } from './components/assessments/submissions/submissions-view/submissions-view.component';
import { JobsContainerComponent } from './components/jobs/jobs-container/jobs-container.component';
import { JobsComponent } from './components/jobs/jobs/jobs.component';
import { JobsListContainerComponent } from './components/jobs/jobs-list/jobs-list-container/jobs-list-container.component';
import { JobsListComponent } from './components/jobs/jobs-list/jobs-list/jobs-list.component';
import { JobEffects } from '@app/modules/company/effects/job.effects';
import { CompanyJobService } from '@app/services/company/company-job/company-job.service';
import { SuccessJobsComponent } from './components/jobs/success-jobs/success-jobs.component';
import { JobsUpdateContainerComponent } from './components/jobs/jobs-update-container/jobs-update-container.component';
import { JobViewContainerComponent } from './components/jobs/job-view-container/job-view-container.component';
import { JobViewComponent } from '@app/modules/company/components/jobs/job-view/job-view.component';
import { AssessmentPreviewComponent } from './components/assessments/assessment-preview/assessment-preview.component';
import { AssessmentFeedbackComponent } from './components/assessments/assessment-feedback/assessment-feedback/assessment-feedback.component';
import { AssessmentFeedbackContainerComponent } from './components/assessments/assessment-feedback/assessment-feedback-container/assessment-feedback-container.component';
import { UpdatePasswordComponent } from './components/update-password/update-password/update-password.component';
import { UpdatePasswordContainerComponent } from './components/update-password/update-password-container/update-password-container.component';
import { AssessmentFeedbackSuccessComponent } from './components/assessments/assessment-feedback/assessment-feedback-success/assessment-feedback-success.component';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FlexLayoutModule,
    SharedModule,
    BarRatingModule,
    StoreModule.forFeature('company', reducers),
    EffectsModule.forFeature([
      CompanyEffects,
      AssessmentEffects,
      QuestionsEffects,
      JobEffects
    ])
  ],
  declarations: [
    HomeComponent,
    JobPreviewComponent,
    AssessmentListComponent,
    AssessmentListContainerComponent,
    SubmissionsContainerComponent,
    SubmissionsViewComponent,
    AssessmentCreateComponent,
    AssessmentEditContainerComponent,
    AssesmentCreateContainerComponent,
    PasswordSetupContainerComponent,
    PasswordSetupComponent,
    AssessmentCreateDescriptionComponent,
    AssessmentCreateSuccessComponent,
    UpdateProfileComponent,
    UpdateProfileContainerComponent,
    JobsContainerComponent,
    JobsComponent,
    JobsListContainerComponent,
    JobsListComponent,
    SuccessJobsComponent,
    JobsUpdateContainerComponent,
    JobViewContainerComponent,
    JobViewComponent,
    AssessmentPreviewComponent,
    AssessmentViewContainerComponent,
    AssessmentFeedbackComponent,
    AssessmentFeedbackContainerComponent,
    UpdatePasswordComponent,
    UpdatePasswordContainerComponent,
    AssessmentFeedbackSuccessComponent
  ],
  providers: [
    CompanyService,
    CompanyJobService,
    HomeGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorService,
      multi: true
    }
  ]
})
export class CompanyModule {}
