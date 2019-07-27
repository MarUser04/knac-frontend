import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { JobsListComponent } from '../../components/jobs/jobs-list/jobs-list.component';
import { AssessmentListContainerComponent } from './components/assessments/assessment-list/assessment-list-container/assessment-list-container.component';
import { PasswordSetupContainerComponent } from '@app/modules/company/components/password-setup/password-setup-container/password-setup-container.component';

import { ProfessionalListContainerComponent } from '@app/shared/components/professional-list-container/professional-list-container.component';
import { CompanyProfileContainerComponent } from '@app/shared/components/company-profile-container/company-profile-container.component';
import { AssesmentCreateContainerComponent } from '@app/modules/company/components/assessments/assessment-create/assesment-create-container/assesment-create-container.component';
import { UpdateProfileContainerComponent } from '@app/modules/company/components/profile/update/update-profile-container/update-profile-container.component';
import { PublicProfileContainerComponent } from '@app/shared/components/public-profile-container/public-profile-container.component';
import { PostsContainerComponent } from '@app/modules/professional/components/posts-container/posts-container.component';
import { HomeGuardService as HomeGuard } from '@app/modules/company/guards/home/home-guard.service';
import { AssessmentViewContainerComponent } from '@app/modules/company/components/assessments/assessment-view-container/assessment-view-container.component';
import { AssessmentEditContainerComponent } from '@app/modules/company/components/assessments/assessment-edit-container/assessment-edit-container.component';
import { SubmissionsContainerComponent } from './components/assessments/submissions/submissions-container.component';
import { AssessmentCreateSuccessComponent } from '@app/modules/company/components/assessments/assessment-create/assessment-create-success/assessment-create-success.component';
import { JobsListContainerComponent } from '@app/modules/company/components/jobs/jobs-list/jobs-list-container/jobs-list-container.component';
import { JobsContainerComponent } from '@app/modules/company/components/jobs/jobs-container/jobs-container.component';
import { SuccessJobsComponent } from './components/jobs/success-jobs/success-jobs.component';
import { JobsUpdateContainerComponent } from '@app/modules/company/components/jobs/jobs-update-container/jobs-update-container.component';
import { JobViewContainerComponent } from '@app/modules/company/components/jobs/job-view-container/job-view-container.component';
import { AssessmentFeedbackComponent } from './components/assessments/assessment-feedback/assessment-feedback/assessment-feedback.component';
import { AssessmentFeedbackContainerComponent } from './components/assessments/assessment-feedback/assessment-feedback-container/assessment-feedback-container.component';
import { UpdatePasswordContainerComponent } from '@app/modules/company/components/update-password/update-password-container/update-password-container.component';
import { TermsCompanyComponent } from '@app/components/site/terms-company/terms-company.component';
import { AssessmentFeedbackSuccessComponent } from '@app/modules/company/components/assessments/assessment-feedback/assessment-feedback-success/assessment-feedback-success.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'jobs',
        component: JobsListContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'jobs/create',
        component: JobsContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'jobs/create/success',
        component: SuccessJobsComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'jobs/:id',
        component: JobViewContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'jobs/edit/:id',
        component: JobsUpdateContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'jobs/create/success',
        component: SuccessJobsComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'jobs/updated/success',
        component: SuccessJobsComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'professionals',
        component: ProfessionalListContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'professionals/:id',
        component: PublicProfileContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'professional/assessments/:id/submissions/:idS',
        component: SubmissionsContainerComponent,
        canActivate: [HomeGuard],
        data: {
          action: 'professional'
        }
      },
      {
        path: 'posts',
        component: PostsContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'assessments',
        component: AssessmentListContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'assessments/create',
        component: AssesmentCreateContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'assessments/create/success',
        component: AssessmentCreateSuccessComponent,
        canActivate: [HomeGuard],
        data: {
          action: 'create'
        }
      },
      {
        path: 'assessments/edit/success',
        component: AssessmentCreateSuccessComponent,
        canActivate: [HomeGuard],
        data: {
          action: 'edit'
        }
      },
      {
        path: 'assessments/edit/:id',
        component: AssessmentEditContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'assessments/updated/success',
        component: AssessmentCreateSuccessComponent,
        canActivate: [HomeGuard],
        data: {
          action: 'edit'
        }
      },
      // Submission to be changed to submissions list component
      {
        path: 'assessments/:id/submissions/:idS/feedback',
        component: AssessmentFeedbackContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'assessments/:id/submissions/:idS/feedback/success',
        component: AssessmentFeedbackSuccessComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'assessments/:id/submissions/:idS',
        component: SubmissionsContainerComponent,
        canActivate: [HomeGuard],
        data: {
          action: 'company'
        }
      },
      {
        path: 'assessments/:id',
        component: AssessmentViewContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'profile',
        component: CompanyProfileContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'profile/edit',
        component: UpdateProfileContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'public/:id',
        component: CompanyProfileContainerComponent,
        canActivate: [HomeGuard]
      },
      {
        path: 'password-setup',
        component: PasswordSetupContainerComponent
      },
      { path: 'update/password', component: UpdatePasswordContainerComponent },
      { path: 'terms', component: TermsCompanyComponent }
    ]
  }
];
