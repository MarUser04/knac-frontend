import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CompanyListComponent } from './components/company-list/company-list/company-list.component';
import { CompanyListContainerComponent } from './components/company-list/company-list-container/company-list-container.component';
import { CompanyListModalComponent } from '@app/modules/admin/components/company-list/company-list-modal/company-list-modal.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { CompanyEffects } from '@app/modules/admin/effects/company.effects';
import { reducers } from './reducers';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { AdminService } from '@app/services/admin/admin.service';
import { CustomInterceptorService } from '@app/services/customInterceptor/customInterceptor.service';
import { TrackContainerComponent } from '@app/modules/admin/components/track/track-container/track-container.component';
import { TrackComponent } from '@app/modules/admin/components/track/track/track.component';
import { TrackEffects } from '@app/modules/admin/effects/track.effects';
import { QuestionsEffects } from '@app/modules/admin/effects/questions.effects';
import { TrackModalComponent } from '@app/modules/admin/components/track/track-modal/track-modal.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { QuestionsComponent } from '@app/modules/admin/components/questions/questions/questions.component';
import { QuestionsContainerComponent } from '@app/modules/admin/components/questions/questions-container/questions-container.component';
import { SkillEffects } from '@app/modules/admin/effects/skill.effects';
import { SkillContainerComponent } from '@app/modules/admin/components/skill/skill-container/skill-container.component';
import { SkillComponent } from '@app/modules/admin/components/skill/skill/skill.component';
import { SkillModalComponent } from '@app/modules/admin/components/skill/skill-modal/skill-modal.component';
import { TemplateEffects } from '@app/modules/admin/effects/template.effects';
import { TemplateContainerComponent } from '@app/modules/admin/components/template/template-container/template-container.component';
import { TemplateComponent } from '@app/modules/admin/components/template/template/template.component';
import { TemplateModalComponent } from '@app/modules/admin/components/template/template-modal/template-modal.component';
import { UpdatePasswordComponent } from './components/update-password/update-password/update-password.component';
import { UpdatePasswordContainerComponent } from './components/update-password/update-password-container/update-password-container.component';
import { AdminEffects } from '@app/modules/admin/effects/admin.effects';
import { CompaniesContainerComponent } from './components/companies/companies-container/companies-container.component';
import { CompaniesComponent } from './components/companies/companies/companies.component';
import { CompaniesEffects } from '@app/modules/admin/effects/companies.effects';
import { SearchCompanyComponent } from '@app/modules/admin/components/companies/search-company/search-company.component';
import { ProfessionalsContainerComponent } from '@app/modules/admin/components/professionals/professionals-container/professionals-container.component';
import { ProfessionalsComponent } from '@app/modules/admin/components/professionals/professionals/professionals.component';
import { ProfessionalsEffects } from '@app/modules/admin/effects/professionals.effects';
import { SearchProfessionalComponent } from '@app/modules/admin/components/professionals/search-professional/search-professional.component';
import { ProfessionalProfileContainerComponent } from './components/professionals/professional-profile-container/professional-profile-container.component';
import { ProfessionalProfileComponent } from './components/professionals/professional-profile/professional-profile.component';
import { CompanyProfileContainerComponent } from './components/companies/company-profile-container/company-profile-container.component';
import { CompanyProfileComponent } from './components/companies/company-profile/company-profile.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature([
      CompanyEffects,
      TrackEffects,
      QuestionsEffects,
      SkillEffects,
      TemplateEffects,
      AdminEffects,
      CompaniesEffects,
      ProfessionalsEffects
    ]),
    SweetAlert2Module.forRoot(),
    TableModule,
    MenuModule
  ],
  declarations: [
    CompanyListComponent,
    CompanyListContainerComponent,
    CompanyListModalComponent,
    TrackContainerComponent,
    TrackComponent,
    EllipsisPipe,
    DataFilterPipe,
    TrackModalComponent,
    QuestionsComponent,
    QuestionsContainerComponent,
    SkillContainerComponent,
    SkillComponent,
    SkillModalComponent,
    TemplateContainerComponent,
    TemplateComponent,
    TemplateModalComponent,
    UpdatePasswordComponent,
    UpdatePasswordContainerComponent,
    CompaniesContainerComponent,
    CompaniesComponent,
    SearchCompanyComponent,
    ProfessionalsContainerComponent,
    ProfessionalsComponent,
    SearchProfessionalComponent,
    ProfessionalProfileContainerComponent,
    ProfessionalProfileComponent,
    CompanyProfileContainerComponent,
    CompanyProfileComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorService,
      multi: true
    },
    AdminService
  ]
})
export class AdminModule {}
