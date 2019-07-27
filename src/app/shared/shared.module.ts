import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { KeyFilterModule } from 'primeng/keyfilter';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {
  MatTabsModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatMenuModule,
  MatExpansionModule
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSpinKitModule } from 'ng-spin-kit';
import { LoadingModule } from 'ngx-loading';
import { LayoutModule } from '@angular/cdk/layout';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// import { JwPaginationComponent } from 'jw-angular-pagination';

import { JobsListComponent } from '@app/components/jobs/jobs-list/jobs-list.component';
import { PageConstructionComponent } from './page-construction/page-construction.component';
import { ErrorMessageComponent } from '@app/components/shared/error-message/error-message.component';

import { AssessmentCreatePreviewComponent } from '@app/modules/company/components/assessments/assessment-create/assessment-create-preview/assessment-create-preview.component';

import { ProfessionalsListComponent } from '@app/components/professional/professionals-list/professionals-list.component';
import { PublicProfileComponent } from '@app/components/professional/public-profile/public-profile.component';
import { ProfessionalListContainerComponent } from './components/professional-list-container/professional-list-container.component';
import { PublicProfileContainerComponent } from './components/public-profile-container/public-profile-container.component';
import { CompanyProfileContainerComponent } from './components/company-profile-container/company-profile-container.component';
import { ProfileCompanyComponent } from '@app/components/company/profile/profile-company.component';

import { ProfessionalListEffects } from '@app/shared/effects/professional-list.effects';
import { PublicProfileEffects } from '@app/shared/effects/public-profile.effects';
import { CompanyProfileEffects } from '@app/shared/effects/company-profile.effects';
import { BlogsPageEffects } from '@app/shared/effects/blogs-page.effects';
import { TrackEffects } from '@app/shared/effects/track.effects';

import { PostsContainerComponent } from '@app/modules/professional/components/posts-container/posts-container.component';
import { PostContainerComponent } from '@app/modules/professional/components/post-container/post-container.component';
import { PostsComponent } from '@app/components/shared/blog/posts/posts.component';
import { PostComponent } from '@app/components/shared/blog/post/post.component';
import { SearchProfessionalComponent } from '@app/modules/company/components/search-professional/search-professional.component';

import { reducers } from './reducers';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SkillsEffects } from '@app/shared/effects/skills.effects';
import { TermsCompanyComponent } from '@app/components/site/terms-company/terms-company.component';
import { TermsProfessionalComponent } from '@app/modules/site/components/terms-professional/terms-professional.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination'
  },
  keyboard: true,
  mousewheel: true,
  scrollbar: false,
  autoplay: { delay: 5000 }
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    SwiperModule,
    MatTooltipModule,
    MatMenuModule,
    LayoutModule,
    MatExpansionModule,
    LoadingBarHttpClientModule,
    NgSpinKitModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    LoadingModule,
    KeyFilterModule,
    StoreModule.forFeature('shared', reducers),
    EffectsModule.forFeature([
      ProfessionalListEffects,
      BlogsPageEffects,
      PublicProfileEffects,
      CompanyProfileEffects,
      TrackEffects,
      SkillsEffects
    ]),
    SweetAlert2Module.forRoot(),
    NgSelectModule
  ],
  declarations: [
    CompanyProfileContainerComponent,
    ProfileCompanyComponent,
    ProfessionalListContainerComponent,
    PublicProfileContainerComponent,
    JobsListComponent,
    PostsContainerComponent,
    PostContainerComponent,
    PostsComponent,
    PostComponent,
    AssessmentCreatePreviewComponent,
    PageConstructionComponent,
    ErrorMessageComponent,
    ProfessionalsListComponent,
    PublicProfileComponent,
    DialogComponent,
    VideoPlayerComponent,
    VideoPlayerComponent,
    PaginatorComponent,
    SearchProfessionalComponent,
    TermsCompanyComponent,
    TermsProfessionalComponent
  ],
  exports: [
    CompanyProfileContainerComponent,
    ProfileCompanyComponent,
    ProfessionalListContainerComponent,
    PublicProfileContainerComponent,
    ProfessionalsListComponent,
    PostsContainerComponent,
    PostContainerComponent,
    AssessmentCreatePreviewComponent,
    PostsComponent,
    PostComponent,
    PublicProfileComponent,
    LoadingBarHttpClientModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    LayoutModule,
    SwiperModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    PageConstructionComponent,
    ReactiveFormsModule,
    ErrorMessageComponent,
    NgSpinKitModule,
    DialogComponent,
    VideoPlayerComponent,
    LoadingModule,
    KeyFilterModule,
    NgSelectModule,
    PaginatorComponent,
    TermsCompanyComponent,
    TermsProfessionalComponent
    // JwPaginationComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule {}
