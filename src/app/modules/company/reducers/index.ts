import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import { Company } from '../models/company';
import { Questions } from '../models/questions';
import { Job } from '../models/job';
import { Assessment } from '@app/shared/models/assessment';
import * as fromProfile from './profile';
import * as fromAssessment from './assessment';
import * as fromAssessmentID from './assessment-id';
import * as fromPage from './page';
import * as fromModalUpdate from './modal-update-toggle';
import * as fromModalFeedback from './modal-feedback-toggle';
import * as fromRoot from '@app/reducers';
import * as fromQuestions from './questions';
import * as fromJob from './job';
import * as fromJobModal from './job-modal-toggle';

export interface CompanyState {
  profile: any;
  pending: boolean;
  assessment: fromAssessment.State;
  assessment_id: fromAssessmentID.State;
  jobs: fromJob.State;
  jobModalToggle: boolean;
  modalUpdateToggle: boolean;
  questions: fromQuestions.State;
  modalFeedbackToggle: boolean;
}

export const reducers: ActionReducerMap<CompanyState> = {
  profile: fromProfile.reducer,
  pending: fromPage.reducer,
  assessment: fromAssessment.reducer,
  assessment_id: fromAssessmentID.reducer,
  jobs: fromJob.reducer,
  jobModalToggle: fromJobModal.reducer,
  modalUpdateToggle: fromModalUpdate.reducer,
  questions: fromQuestions.reducer,
  modalFeedbackToggle: fromModalFeedback.reducer
};

// Selectors
export const getCompanyState = createFeatureSelector<CompanyState>('company');

export const getProfile = createSelector(
  getCompanyState,
  ({ profile }: CompanyState) => ({
    photos: profile.photos || [],
    videos: profile.videos || [],
    logo:
      profile.logo && profile.logo !== 'undefined'
        ? profile.logo
        : 'https://vmcontenders.org/wp-content/plugins/freshweb-cdi-avatar/front/images/avatar-member-min.jpg',
    name: profile.name || 'Company Name',
    contactName: profile.contactName || '',
    phone: profile.phone || '',
    description: profile.aboutUs || 'My Company Description',
    facebook: profile.facebook || '',
    founded: profile.founded.slice(0, 10) || '2018-01-01',
    industry: profile.industry || 'My Industry',
    locations: profile.locations || 'My location',
    companySize: profile.companySize || 0,
    twitter: profile.twitter || '',
    hasSetupPassword: profile.hasSetupPassword,
    hasLoadedProfile: profile.hasLoadedProfile
  })
);

export const getHasSetupPassword = createSelector(
  getProfile,
  ({ hasSetupPassword }: Company): boolean => hasSetupPassword
);

export const getHasLoadedProfile = createSelector(
  getProfile,
  ({ hasLoadedProfile }: Company): boolean => hasLoadedProfile
);

export const getPending = createSelector(
  getCompanyState,
  (state: CompanyState): boolean => state.pending
);

export const getProfilePending = createSelector(
  getCompanyState,
  ({ profile }: CompanyState): boolean => profile.pending
);

export const getCompanyById = createSelector(
  getCompanyState,
  (state: CompanyState): fromProfile.State => state.profile
);

export const getTemplates = createSelector(
  getCompanyState,
  (state: CompanyState): fromAssessment.State => state.assessment
);

export const getAssessmentID = createSelector(
  getCompanyState,
  (state: CompanyState): fromAssessmentID.State => state.assessment_id
);

export const getAssessmentSubmissions = createSelector(
  getCompanyState,
  (state: CompanyState): fromAssessment.State => state.assessment.assessmentSubmissions
);

export const getJobs = createSelector(
  getCompanyState,
  (state: CompanyState): Job[] => state.jobs.jobs
);

export const getJob = createSelector(
  getCompanyState,
  (state: CompanyState): Job => state.jobs.job
);

export const getJobsTogglePending = createSelector(
  getCompanyState,
  (state: CompanyState): boolean => state.jobs.JobsTogglePending
);

export const getModalUpdateToggle = createSelector(
  getCompanyState,
  (state: CompanyState): boolean => state.modalUpdateToggle
);

export const getQuestions = createSelector(
  getCompanyState,
  (state: CompanyState): Questions => state.questions.questions
);

export const getTogglePendingProcessingQuestions = createSelector(
  getCompanyState,
  (state: CompanyState): boolean => state.questions.pendingProcessingQuestions
);

export const getModalFeedbackToggle = createSelector(
  getCompanyState,
  (state: CompanyState): boolean => state.modalFeedbackToggle
);

export const getJobModalToggle = createSelector(
  getCompanyState,
  (state: CompanyState): boolean => state.jobModalToggle
);
