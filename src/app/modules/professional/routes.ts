import { Routes, CanActivateChild } from '@angular/router';

import { HomeComponent } from '@app/components/professional/home/home.component';
import { ProfileProfessionalComponent } from '@app/components/professional/profile/profile-professional.component';
import { AssessmentsListContainerComponent } from '@app/modules/professional/components/assessment/assessments-list/assessments-list-container/assessments-list-container.component';
import { PostsContainerComponent } from '@app/modules/professional/components/posts-container/posts-container.component';
import { PostContainerComponent } from '@app/modules/professional/components/post-container/post-container.component';
import { UpdateProfileContainerComponent } from '@app/modules/professional/components/profile/update/update-profile-container/update-profile-container.component';
import { ProfessionalListContainerComponent } from '@app/shared/components/professional-list-container/professional-list-container.component';
import { PublicProfileContainerComponent } from '@app/shared/components/public-profile-container/public-profile-container.component';
import { AssessmentEditionContainerComponent } from '@app/modules/professional/components/assessment/assessment-edition-container/assessment-edition-container.component';
import { AssessmentSuccessComponent } from '@app/modules/professional/components/assessment/assessment-success/assessment-success.component';
import { AssessmentGuard } from '@app/modules/professional/guard/assessment.guard';
import { JobsListContainerComponent } from './components/jobs/jobs-list-container/jobs-list-container.component';
import { JobViewContainerComponent } from '@app/modules/professional/components/jobs/job-view-container/job-view-container.component';
import { JobSuccessComponent } from './components/jobs/job-success/job-success.component';
import { AssessmentFeedbackContainerComponent } from '@app/modules/professional/components/assessment/assessment-feedback/assessment-feedback-container/assessment-feedback-container.component';
import { CompanyListContainerComponent } from '@app/modules/professional/components/company-list/company-list.container/company-list-container.component';
import { ProfileProfessionalViewComponent } from '@app/modules/professional/components/profile/profile-professional-view/profile-professional-view.component';
import { ProfileProfessionalContainerComponent } from '@app/modules/professional/components/profile/profile-professional-container/profile-professional-container.component';
import { CompanyContainerComponent } from '@app/modules/professional/components/company/company-container/company-container.component';
import { UpdatePasswordContainerComponent } from '@app/modules/professional/components/update-password/update-password-container/update-password-container.component';
import { TermsProfessionalComponent } from '@app/modules/site/components/terms-professional/terms-professional.component';

export const routes: Routes = [
  {
    path: '',
    /* canActivateChild: [AuthGuard], */
    children: [
      { path: '', component: ProfileProfessionalContainerComponent },
      { path: 'posts', component: PostsContainerComponent },
      { path: 'post/:id', component: PostContainerComponent },
      { path: 'profile', component: ProfileProfessionalComponent },
      { path: 'profile/edit', component: UpdateProfileContainerComponent },
      { path: 'jobs', component: JobsListContainerComponent },
      { path: 'jobs/success', component: JobSuccessComponent },
      { path: 'jobs/:id', component: JobViewContainerComponent },
      { path: 'assessments', component: AssessmentsListContainerComponent },
      {
        path: 'assessment/success',
        component: AssessmentSuccessComponent
      },
      {
        path: 'assessment/:id',
        component: AssessmentEditionContainerComponent,
        canDeactivate: [AssessmentGuard]
      },
      {
        path: 'assessments/feedback/:id',
        component: AssessmentFeedbackContainerComponent
      },
      { path: 'companies', component: CompanyListContainerComponent },
      { path: 'companies/:id', component: CompanyContainerComponent },
      { path: 'public', component: PublicProfileContainerComponent },
      { path: 'public/:id', component: PublicProfileContainerComponent },
      { path: 'update/password', component: UpdatePasswordContainerComponent },
      { path: 'terms', component: TermsProfessionalComponent }
    ]
  }
];
