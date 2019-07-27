import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromProfessionalList from './professional-list';
import * as fromProfessionalProfile from './public-profile';
import * as fromCompanyProfile from './company-profile';
import * as fromTrack from './track';
import * as fromBlogs from './blogs';
import * as fromBlog from './blog';
import * as fromRoot from '@app/reducers';
import * as fromSkills from './skills';

import { Professional } from '../models/professional';
import { Assessment } from '../models/assessment';
import { Blog } from '../models/blog';
import { Track } from '../models/track';

export interface SharedState {
  tracks: fromTrack.State;
  professionals: fromProfessionalList.State;
  professional: fromProfessionalProfile.State;
  company: fromCompanyProfile.State;
  blogs: fromBlogs.State;
  blog: fromBlog.State;
  skills: fromSkills.State;
}

export interface State extends fromRoot.State {
  professionals: SharedState;
  professional: SharedState;
  company: SharedState;
  assessment: SharedState;
  tracks: SharedState;
  questions: SharedState;
  skills: SharedState;
}

export const reducers: ActionReducerMap<SharedState> = {
  professionals: fromProfessionalList.reducer,
  professional: fromProfessionalProfile.reducer,
  company: fromCompanyProfile.reducer,
  blogs: fromBlogs.reducer,
  blog: fromBlog.reducer,
  tracks: fromTrack.reducer,
  skills: fromSkills.reducer
};

export const getSharedState = createFeatureSelector<SharedState>('shared');

// Blogs
export const getBlogEntitiesState = createSelector(
  getSharedState,
  (state: SharedState): fromBlogs.State => state.blogs
);

export const getBlogEntities = createSelector(
  getBlogEntitiesState,
  fromBlogs.getBlogEntities
);

export const getBlogIds = createSelector(
  getBlogEntitiesState,
  fromBlogs.getBlogIds
);

export const getAllBlogs = createSelector(
  getBlogEntities,
  getBlogIds,
  (entities, ids: string[]) => {
    return ids.map(id => entities[id]);
  }
);

// Blog
export const getBlog = createSelector(
  getSharedState,
  (state: SharedState): Blog => state.blog
);

export const getEmbedded = createSelector(
  getBlog,
  blog => blog._embedded
);

export const getImage = createSelector(
  getEmbedded,
  embedded => {
    return embedded['wp:featuredmedia'][0].source_url;
  }
);

export const getAuthor = createSelector(
  getEmbedded,
  embedded => {
    return embedded.author[0].name;
  }
);

export const getBlogFormatted = createSelector(
  getBlog,
  getImage,
  getAuthor,
  (blog, image, writer) => ({ ...blog, image, writer })
);

// Professionals
export const getProfessionals = createSelector(
  getSharedState,
  (state: SharedState): fromProfessionalList.State => state.professionals
);

export const getProfessionalById = createSelector(
  getSharedState,
  (state: SharedState): fromProfessionalProfile.State =>
    state.professional.professional
);

export const getProfessional = createSelector(
  getSharedState,
  (state: SharedState): any => state.professional.professional
);

export const getPendingProfilePhote = createSelector(
  getSharedState,
  (state: SharedState): boolean => state.professional.pendingProfilePhote
);

export const modalGaleryToggle = createSelector(
  getSharedState,
  (state: SharedState): boolean => state.professional.modalGaleryToggle
);

export const showSnackbar = createSelector(
  getSharedState,
  (state: SharedState): boolean => state.professional.showSnackbar
);

// Company
export const getCompanyById = createSelector(
  getSharedState,
  (state: SharedState): fromCompanyProfile.State => state.company.company
);

export const showSnackbarCompany = createSelector(
  getSharedState,
  (state: SharedState): boolean => state.company.showSnackbar
);

// Assessment
export const getCompanyAssessment = createSelector(
  getSharedState,
  (state: SharedState): Assessment => state.company.company_assessment
);

export const getCompanyAssessmentByID = createSelector(
  getSharedState,
  (state: SharedState): any => state.company.assessment
);

// Track
export const getTrackList = createSelector(
  getSharedState,
  (state: SharedState): fromTrack.State => state.tracks
);

// skills

export const getSkillsList = createSelector(
  getSharedState,
  (state: SharedState): fromSkills.State => state.skills
);
