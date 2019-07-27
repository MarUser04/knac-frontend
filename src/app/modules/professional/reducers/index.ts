import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import * as fromProfile from './profile';
import * as fromAssessment from './assessment';
import * as fromRoot from '@app/reducers';
import { Blog } from '@app/modules/professional/models/blog';
import { Profile } from '../models/profile';
import { Assessment } from '@app/shared/models/assessment';
import * as _ from 'underscore';
import * as fromJob from './job';
import * as fromSkills from './skill';
import * as fromCompany from './company';
import * as fromProfessional from './professional';
import { Job } from '@app/modules/professional/models/job';

export interface ProfessionalState {
  profile: fromProfile.State;
  assessment: fromAssessment.State;
  jobs: fromJob.State;
  skills: fromSkills.State;
  company: fromCompany.State;
  pendingUpdate: fromProfessional.State;
}

export interface State extends fromRoot.State {
  blogs: ProfessionalState;
  blog: ProfessionalState;
  profile: ProfessionalState;
  professionals: ProfessionalState;
  professional: ProfessionalState;
  assessment: ProfessionalState;
  jobs: ProfessionalState;
  skills: ProfessionalState;
  company: ProfessionalState;
}

export const reducers: ActionReducerMap<ProfessionalState> = {
  profile: fromProfile.reducer,
  assessment: fromAssessment.reducer,
  jobs: fromJob.reducer,
  skills: fromSkills.reducer,
  company: fromCompany.reducer,
  pendingUpdate: fromProfessional.reducer
};

// Selectors
export const getProfessionalState = createFeatureSelector<ProfessionalState>(
  'professionals'
);

export const getProfile = createSelector(
  getProfessionalState,
  (state: ProfessionalState): fromProfile.State => state.profile
);

export const getProfilePending = createSelector(
  getProfile,
  (profile: Profile): boolean => profile.pending
);

export const getAssessment = createSelector(
  getProfessionalState,
  (state: ProfessionalState): fromAssessment.State => state.assessment
);

export const getPendingProcessingAssessment = createSelector(
  getAssessment,
  (state: fromAssessment.State): boolean => state.pendingProcessingAssessment
);

export const getTakingPendingProcessingAssessment = createSelector(
  getAssessment,
  (state: fromAssessment.State): boolean => state.takingPendingProcessAssessment
);

export const getAssessmentsList = createSelector(
  getAssessment,
  (state: fromAssessment.State): Assessment[] => state.assessments
);

export const getCompletedAssessmentsIds = createSelector(
  getAssessment,
  (state: fromAssessment.State): string[] => state.completedAssessments
);

export const getJobsList = createSelector(
  getProfessionalState,
  (state: ProfessionalState): Job[] => state.jobs.jobs
);

export const getJobsIDs = createSelector(
  getProfessionalState,
  (state: ProfessionalState): string[] => state.jobs.jobsIDs
);

const getJobsParsed = (list: Job[], ids: string[]): Job[] => {
  const jobs = list.map(job => {
    if (_.contains(ids, job._id)) {
      return {
        ...job,
        isApplied: true
      };
    } else {
      return {
        ...job,
        isApplied: false
      };
    }
  });

  return jobs;
};

export const getApplyPendingProcessingJob = createSelector(
  getProfessionalState,
  (state: ProfessionalState): boolean => state.jobs.ApplyPendingProcessingJob
);

export const getJobs = createSelector(
  getJobsList,
  getJobsIDs,
  getJobsParsed
);

export const getJob = createSelector(
  getProfessionalState,
  (state: ProfessionalState): Job => state.jobs.job
);

export const getCompletedJobs = createSelector(
  getJobs,
  (job: Job[]): Job[] => job.filter(({ isApplied }) => isApplied)
);

export const getNotCompletedJobs = createSelector(
  getJobs,
  (job: Job[]): Job[] => job.filter(({ isApplied }) => !isApplied)
);

const getAssessmentsParsed = (list: Assessment[], ids: string[]): any => {
  const completedAssessments = list.map(assessment => {
    if (_.contains(ids, assessment.assessment._id)) {
      return {
        ...assessment,
        isCompleted: true
      };
    } else {
      return {
        ...assessment,
        isCompleted: false
      };
    }
  });

  return completedAssessments;
};

export const getAssessments = createSelector(
  getAssessmentsList,
  getCompletedAssessmentsIds,
  getAssessmentsParsed
);

export const getCompletedAssessments = createSelector(
  getAssessments,
  (assessments: Assessment[]): Assessment[] =>
    assessments.filter(({ isCompleted }) => isCompleted)
);

export const getNotCompletedAssessments = createSelector(
  getAssessments,
  (assessments: Assessment[]): Assessment[] =>
    assessments.filter(({ isCompleted }) => !isCompleted)
);

export const getAssessmentTaked = createSelector(
  getAssessment,
  (state: fromAssessment.State): any => state.assessment
);

export const getAssessmentExpiration = createSelector(
  getAssessmentTaked,
  (assessment: Assessment): any => assessment.expiration
);

export const getSkills = createSelector(
  getProfessionalState,
  (state: ProfessionalState): fromSkills.State => state.skills
);

export const getCompanies = createSelector(
  getProfessionalState,
  (state: ProfessionalState): any => state.company.companies
);

export const getCompany = createSelector(
  getProfessionalState,
  (state: ProfessionalState): any => state.company.company
);

export const getCompanyName = createSelector(
  getProfessionalState,
  (state: ProfessionalState): any => state.company.companyName
);

const getCompanyIdFilter = (list: any, name: string): any => {
  if (list) {
    const companyName = list.filter(company => {
      const companyNameById = company.name.replace(/\s/g, '');
      if (name === companyNameById) {
        return company;
      }
    });
    // const company = companyName[0];
    // console.log(company.user);
    // return company.user;
    return companyName[0];
  }
};

export const getCompanyByName = createSelector(
  getCompanies,
  getCompanyName,
  getCompanyIdFilter
);

export const getCompanyAssessments = createSelector(
  getCompany,
  (state: any): Assessment[] => state.assessments
);

export const getFeedbackAssessments = createSelector(
  getProfessionalState,
  (state: any): any => state.assessment.feedback
);

export const getQuestions = createSelector(
  getProfessionalState,
  (state: any): any => state.assessment.questions
);

export const getCompanyJobs = createSelector(
  getCompany,
  (state: any): Job[] => state.jobs
);

const getAssessmentsParsedByCompany = (
  list: Assessment[],
  ids: string[]
): any => {
  if (list) {
    const completedAssessments = list.map(assessment => {
      if (_.contains(ids, assessment._id)) {
        return {
          ...assessment,
          isCompleted: true
        };
      } else {
        return {
          ...assessment,
          isCompleted: false
        };
      }
    });

    return completedAssessments;
  }
};

export const getAssessmentsByCompany = createSelector(
  getCompanyAssessments,
  getCompletedAssessmentsIds,
  getAssessmentsParsedByCompany
);

const getAssessmentsFeedbackParsedByCompany = (
  listAssessmentByCompany: Assessment[],
  listAssessment: Assessment[]
): any => {
  if (listAssessmentByCompany && listAssessment) {
    const completedAssessments = listAssessmentByCompany.map(assessment => {
      const assessmentSubmission = listAssessment
        .map(assessmentList => {
          if (assessmentList.assessment._id === assessment._id) {
            return {
              assessment: assessment,
              submission: assessmentList.submission
            };
          }
        })
        .filter(assessment => assessment)[0];

      return assessmentSubmission;
    });
    return completedAssessments;
  }
};

export const getAssessmentsFeedbackByCompany = createSelector(
  getAssessmentsByCompany,
  getAssessmentsList,
  getAssessmentsFeedbackParsedByCompany
);

const getJobsParsedByCompany = (list: Job[], ids: string[]): any => {
  if (list) {
    const jobs = list.map(job => {
      if (_.contains(ids, job._id)) {
        return {
          ...job,
          isApplied: true
        };
      } else {
        return {
          ...job,
          isApplied: false
        };
      }
    });

    return jobs;
  }
};

export const getJobsByCompany = createSelector(
  getCompanyJobs,
  getJobsIDs,
  getJobsParsedByCompany
);

export const getPendingUpdatePassword = createSelector(
  getProfessionalState,
  (state: ProfessionalState): boolean => state.pendingUpdate.pending
);
