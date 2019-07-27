import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromCompany from './company';
import * as fromCompanies from './companies';
import * as fromTrack from './track';
import * as fromPending from './pending';
import * as fromLoading from './loading';
import * as fromModalCreate from './modal-create-toggle';
import * as fromModalUpdate from './modal-update-toggle';
import * as fromQuestions from './questions';
import * as fromSkill from './skill';
import * as fromTemplate from './template';
import * as fromProfessional from './professionals';
import { Skill } from '@app/modules/admin/models/skill';

export interface AdminState {
  companies: fromCompany.State;
  companyList: fromCompanies.State;
  professionals: fromProfessional.State;
  pending: boolean;
  loading: boolean;
  modalCreateToggle: boolean;
  modalUpdateToggle: boolean;
  tracks: fromTrack.State;
  questions: fromQuestions.State;
  skills: fromSkill.State;
  template: fromTemplate.State;
}

export interface State extends fromRoot.State {}

export const getAdminState = createFeatureSelector<AdminState>('admin');

export const reducers: ActionReducerMap<AdminState> = {
  companies: fromCompany.reducer,
  companyList: fromCompanies.reducer,
  professionals: fromProfessional.reducer,
  pending: fromPending.reducer,
  loading: fromLoading.reducer,
  modalCreateToggle: fromModalCreate.reducer,
  modalUpdateToggle: fromModalUpdate.reducer,
  tracks: fromTrack.reducer,
  questions: fromQuestions.reducer,
  skills: fromSkill.reducer,
  template: fromTemplate.reducer
};

export const getCompanies = createSelector(
  getAdminState,
  (state: AdminState): fromCompany.State => state.companies
);

export const getPending = createSelector(
  getAdminState,
  (state: AdminState): boolean => state.pending
);

export const getLoading = createSelector(
  getAdminState,
  (state: AdminState): boolean => state.loading
);

export const getModalCreateToggle = createSelector(
  getAdminState,
  (state: AdminState): boolean => state.modalCreateToggle
);

export const getModalUpdateToggle = createSelector(
  getAdminState,
  (state: AdminState): boolean => state.modalUpdateToggle
);

export const getTracks = createSelector(
  getAdminState,
  (state: AdminState): fromTrack.State => state.tracks
);

export const getQuestions = createSelector(
  getAdminState,
  (state: AdminState): fromQuestions.State => state.questions
);

export const getSkills = createSelector(
  getAdminState,
  (state: AdminState): fromSkill.State => state.skills
);

export const getTemplates = createSelector(
  getAdminState,
  (state: AdminState): fromTemplate.State => state.template
);

export const getCompanyList = createSelector(
  getAdminState,
  (state: AdminState): fromCompanies.State => state.companyList.companies
);

export const getCompany = createSelector(
  getAdminState,
  (state: AdminState): fromCompanies.State => state.companyList.company
);

export const getProfessionals = createSelector(
  getAdminState,
  (state: AdminState): fromProfessional.State =>
    state.professionals.professionals
);

export const getProfessional = createSelector(
  getAdminState,
  (state: AdminState): fromProfessional.State =>
    state.professionals.professional
);

export const getCompanyName = createSelector(
  getAdminState,
  (state: AdminState): any => state.companyList.companyName
);

const getCompanyIdFilter = (list: any, name: string): any => {
  if (list) {
    const companyName = list.filter(company => {
      const companyNameById = company.name.replace(/\s/g, '');
      if (name === companyNameById) {
        return company;
      }
    });
    return companyName[0];
  }
};

export const getCompanyByName = createSelector(
  getCompanyList,
  getCompanyName,
  getCompanyIdFilter
);

export const {
  selectAll: selectAllTracks
} = fromTrack.trackAdapter.getSelectors(getTracks);
