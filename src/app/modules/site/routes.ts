import { Routes } from '@angular/router';

import { LoginComponent } from '../../components/site/login/login.component';
import { SwitchUserComponent } from '../../components/site/register/switch-user/switch-user.component';
import { RegisterProfessionalsComponent } from '../../components/site/register/register-professionals/register-professionals.component';
import { TermsCompanyComponent } from '../../components/site/terms-company/terms-company.component';
import { RecoverPasswordComponent } from '../../components/site/login/recover-password/recover-password.component';
import { ResetPasswordComponent } from '../../components/site/login/reset-password/reset-password.component';
import { AuthLinkedinComponent } from '../../components/site/register/auth-linkedin/auth-linkedin.component';
import { AuthLinkedinResolverService } from '../../services/resolvers/auth-linkedin/auth-linkedin-resolver.service';
import { RegisterCompanyContainerComponent } from './components/register-company/register-company-container/register-company-container.component';
import { SuccessComponent } from '@app/modules/site/components/success/success.component';
import { TermsProfessionalComponent } from '@app/modules/site/components/terms-professional/terms-professional.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SwitchUserComponent },
      {
        path: 'signup/professional',
        component: RegisterProfessionalsComponent
      },
      { path: 'signup/company', component: RegisterCompanyContainerComponent },
      { path: 'signup/company/success', component: SuccessComponent },
      {
        path: 'auth/linkedin',
        component: AuthLinkedinComponent,
        resolve: { appIsAuthorized: AuthLinkedinResolverService }
      },
      { path: 'terms/company', component: TermsCompanyComponent },
      { path: 'terms/professional', component: TermsProfessionalComponent },
      { path: 'recover-password', component: RecoverPasswordComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent }
    ]
  }
];
