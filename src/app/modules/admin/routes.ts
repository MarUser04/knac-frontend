import { Routes } from '@angular/router';
import { CompanyListContainerComponent } from '@app/modules/admin/components/company-list/company-list-container/company-list-container.component';
import { TrackContainerComponent } from '@app/modules/admin/components/track/track-container/track-container.component';
import { QuestionsContainerComponent } from '@app/modules/admin/components/questions/questions-container/questions-container.component';
import { SkillContainerComponent } from '@app/modules/admin/components/skill/skill-container/skill-container.component';
import { TemplateContainerComponent } from '@app/modules/admin/components/template/template-container/template-container.component';
import { UpdatePasswordContainerComponent } from '@app/modules/admin/components/update-password/update-password-container/update-password-container.component';
import { CompaniesContainerComponent } from '@app/modules/admin/components/companies/companies-container/companies-container.component';
import { ProfessionalsContainerComponent } from '@app/modules/admin/components/professionals/professionals-container/professionals-container.component';
import { ProfessionalProfileContainerComponent } from './components/professionals/professional-profile-container/professional-profile-container.component';
import { CompanyProfileContainerComponent } from './components/companies/company-profile-container/company-profile-container.component';



export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'company/list', component: CompanyListContainerComponent },
      { path: 'track', component: TrackContainerComponent },
      { path: 'questions', component: QuestionsContainerComponent },
      { path: 'skill', component: SkillContainerComponent },
      { path: 'template', component: TemplateContainerComponent },
      { path: 'update/password', component: UpdatePasswordContainerComponent },
      { path: 'companies', component: CompaniesContainerComponent },
      { path: 'professionals', component: ProfessionalsContainerComponent },
      { path: 'professionals/:id', component: ProfessionalProfileContainerComponent },
      { path: 'companies/:id', component: CompanyProfileContainerComponent }
    ]
  }
];
