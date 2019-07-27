import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MomentModule } from 'angular2-moment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CountdownTimerModule } from 'ngx-countdown-timer';

import { reducers } from './reducers';
import { ProfileEffects } from '@app/modules/professional/effects/profile.effects';
import { JobEffects } from '@app/modules/professional/effects/job.effects';
import { AssessmentEffects } from './effects/assessment.effects';
import { SkillEffects } from '@app/modules/professional/effects/skill.effects';

import { ProfessionalRoutingModule } from './professional-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from '@app/components/professional/home/home.component';
import { ProfileProfessionalComponent } from '@app/components/professional/profile/profile-professional.component';
import { UpdateProfileContainerComponent } from '@app/modules/professional/components/profile/update/update-profile-container/update-profile-container.component';
import { UpdateProfileComponent } from '@app/modules/professional/components/profile/update/update-profile/update-profile.component';
import { AssessmentEditionContainerComponent } from '@app/modules/professional/components/assessment/assessment-edition-container/assessment-edition-container.component';
import { AssessmentFormComponent } from './components/assessment/assessment-form/assessment-form.component';
import { AssessmentsListContainerComponent } from '@app/modules/professional/components/assessment/assessments-list/assessments-list-container/assessments-list-container.component';
import { AssessmentsListComponent } from '@app/modules/professional/components/assessment/assessments-list/assessments-list/assessments-list.component';
import { AssessmentSuccessComponent } from '@app/modules/professional/components/assessment/assessment-success/assessment-success.component';
import { JobsListComponent } from './components/jobs/jobs-list/jobs-list.component';
import { JobsListContainerComponent } from './components/jobs/jobs-list-container/jobs-list-container.component';
import { SearchJobsComponent } from './components/jobs/search-jobs/search-jobs.component';
import { JobViewContainerComponent } from './components/jobs/job-view-container/job-view-container.component';
import { JobViewComponent } from '@app/modules/professional/components/jobs/job-view/job-view.component';
import { CustomInterceptorService } from '@app/services/customInterceptor/customInterceptor.service';
import { JobSuccessComponent } from './components/jobs/job-success/job-success.component';
import { AssessmentFeedbackContainerComponent } from './components/assessment/assessment-feedback/assessment-feedback-container/assessment-feedback-container.component';
import { AssessmentFeedbackComponent } from './components/assessment/assessment-feedback/assessment-feedback/assessment-feedback.component';
import { CompanyListContainerComponent } from './components/company-list/company-list.container/company-list-container.component';
import { CompanyListComponent } from './components/company-list/company-list/company-list.component';
import { CompaniesEffects } from '@app/modules/professional/effects/company.effects';
import { ProfileProfessionalContainerComponent } from './components/profile/profile-professional-container/profile-professional-container.component';
import { ProfileProfessionalViewComponent } from '@app/modules/professional/components/profile/profile-professional-view/profile-professional-view.component';
import { CompanyComponent } from './components/company/company/company.component';
import { CompanyContainerComponent } from './components/company/company-container/company-container.component';
import { UpdatePasswordContainerComponent } from './components/update-password/update-password-container/update-password-container.component';
import { UpdatePasswordComponent } from './components/update-password/update-password/update-password.component';
import { ProfessionalEffects } from '@app/modules/professional/effects/professional.effects';
import { SearchCompanyComponent } from '@app/modules/professional/components/company-list/search-company/search-company.component';

@NgModule({
  imports: [
    CommonModule,
    ProfessionalRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MomentModule,
    SweetAlert2Module.forRoot(),
    StoreModule.forFeature('professionals', reducers),
    EffectsModule.forFeature([
      ProfileEffects,
      AssessmentEffects,
      JobEffects,
      SkillEffects,
      CompaniesEffects,
      ProfessionalEffects
    ]),
    CountdownTimerModule.forRoot(),
    MatSlideToggleModule
  ],
  declarations: [
    HomeComponent,
    ProfileProfessionalComponent,
    UpdateProfileComponent,
    UpdateProfileContainerComponent,
    AssessmentEditionContainerComponent,
    AssessmentFormComponent,
    AssessmentsListContainerComponent,
    AssessmentsListComponent,
    AssessmentSuccessComponent,
    JobsListComponent,
    JobsListContainerComponent,
    SearchJobsComponent,
    JobViewContainerComponent,
    JobViewComponent,
    JobSuccessComponent,
    AssessmentFeedbackContainerComponent,
    AssessmentFeedbackComponent,
    CompanyListContainerComponent,
    CompanyListComponent,
    ProfileProfessionalContainerComponent,
    ProfileProfessionalViewComponent,
    CompanyComponent,
    CompanyContainerComponent,
    UpdatePasswordContainerComponent,
    UpdatePasswordComponent,
    SearchCompanyComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorService,
      multi: true
    }
  ]
})
export class ProfessionalModule {}
