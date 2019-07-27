import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';
import { LoginComponent } from '../../components/site/login/login.component';
import { RegisterProfessionalsComponent } from '../../components/site/register/register-professionals/register-professionals.component';
import { RegisterCompanyComponent } from './components/register-company/register-company/register-company.component';
import { RegisterCompanyContainerComponent } from './components/register-company/register-company-container/register-company-container.component';
import { LoginProfessionalsComponent } from '../../components/site/login/login-professionals/login-professionals.component';
import { RecoverPasswordComponent } from '../../components/site/login/recover-password/recover-password.component';
import { SwitchUserComponent } from '../../components/site/register/switch-user/switch-user.component';
import { TermsCompanyComponent } from '../../components/site/terms-company/terms-company.component';
import { ResetPasswordComponent } from '../../components/site/login/reset-password/reset-password.component';
import { AuthLinkedinComponent } from '../../components/site/register/auth-linkedin/auth-linkedin.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SiteEffects } from '@app/modules/site/effects/site.effects';
import { reducers } from './reducers';
import { CompanyService } from '@app/services/company/company.service';
import { CustomInterceptorService } from '@app/services/customInterceptor/customInterceptor.service';
import { SuccessComponent } from './components/success/success.component';
import { TermsProfessionalComponent } from './components/terms-professional/terms-professional.component';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule,
    StoreModule.forFeature('site', reducers),
    EffectsModule.forFeature([SiteEffects])
  ],
  declarations: [
    LoginComponent,
    RegisterProfessionalsComponent,
    RegisterCompanyComponent,
    RegisterCompanyContainerComponent,
    LoginProfessionalsComponent,
    RecoverPasswordComponent,
    SwitchUserComponent,
    ResetPasswordComponent,
    AuthLinkedinComponent,
    SuccessComponent
  ],
  providers: [
    CompanyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorService,
      multi: true
    }
  ]
})
export class SiteModule {}
