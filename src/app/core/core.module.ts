import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatCardModule,
  MatPaginatorModule,
  MatSnackBarModule
} from '@angular/material';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { ToasterService } from 'angular2-toaster';
import { LinkedInSdkModule } from 'angular-linkedin-sdk';
import { HttpModule } from '@angular/http';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { AppRoutingModule } from '@app/app.routing';
import { SiteLayoutComponent } from '@app/containers/site-layout/site-layout.component';
import { ProfessionalLayoutComponent } from '@app/containers/professional-layout/professional-layout.component';
import { CompanyLayoutComponent } from '@app/containers/company-layout/company-layout.component';
import { AdminLayoutComponent } from '@app/containers/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from '@app/containers/home-layout/home-layout.component';
import { MenubarProfessionalComponent } from '@app/components/professional/menubar-professional/menubar-professional.component';
import { MenubarCompanyComponent } from '@app/components/company/menubar-company/menubar-company.component';
import { MenubarRegisterComponent } from '@app/components/site/register/menubar-register/menubar-register.component';
import { MenubarHomeComponent } from '@app/components/home/menubar-home/menubar-home.component';
import { MenubarAdminComponent } from '@app/modules/admin/components/menubar-admin/menubar-admin.component';
import { TokenGetter } from '@app/services/tokenGetter/token-getter';
import { environment as env } from '@app/../environments/environment';
import { AuthService } from '@app/services/auth/auth.service';
import { AdminService } from '@app/services/admin/admin.service';
import { WordpressService } from '@app/services/wordpress/wordpress.service';
import { SiteStorageService } from '@app/services/siteStorage/site-storage.service';
import { ProfessionalListServices } from '@app/services/professional/professional-list/profesional-list.service';
import { ProfessionalServices } from '@app/services/professional/professional.service';
import { CompanyProfileServices } from '@app/services/company/company-profile/company-profile.service';
import { CompanyAssessmentService } from '@app/services/company/company-assessment/company-assessment.service';
import { TrackService } from '@app/services/track/track.service';
import { PostComponent } from '@app/components/shared/blog/post/post.component';
import { PostsComponent } from '@app/components/shared/blog/posts/posts.component';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { CustomInterceptorService } from '@app/services/customInterceptor/customInterceptor.service';
import { AuthGuardService as AuthGuard } from '@app/services/auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from '@app/services/auth/role-guard.service';
import { SkillsService } from '@app/services/skills/skills.service';
import { PreviousRouteService } from '@app/services/auth/previous-route/previous-route.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatSnackBarModule,
    LinkedInSdkModule,
    HttpModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        authScheme: 'bearer ',
        tokenGetter: TokenGetter.getTokenGetter,
        whitelistedDomains: [
          'http://knac-dev-be.herokuapp.com',
          'http://knac-staging-be.herokuapp.com',
          'http://knac-qa-be.herokuapp.com'
        ],
        blacklistedRoutes: [
          'http://knac-dev-be.herokuapp.com/auth/register',
          'http://knac-dev-be.herokuapp.com/auth/login',
          'http://knac-staging-be.herokuapp.com/auth/register',
          'http://knac-staging-be.herokuapp.com/auth/login',
          'https://www.linkedin.com/oauth/v2/authorization',
          'https://www.linkedin.com/oauth/v2/accessToken'
        ],
        throwNoTokenError: true
      }
    }),
    LoadingModule.forRoot({
      fullScreenBackdrop: true,
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: 'rgb(0, 0, 0, 0.1)',
      backdropBorderRadius: '0px',
      primaryColour: '#01DFA5'
    }),
    NgxPageScrollModule
  ],
  declarations: [
    MenubarProfessionalComponent,
    MenubarCompanyComponent,
    MenubarRegisterComponent,
    MenubarAdminComponent,
    MenubarHomeComponent,
    SiteLayoutComponent,
    ProfessionalLayoutComponent,
    CompanyLayoutComponent,
    AdminLayoutComponent,
    HomeLayoutComponent
  ],
  exports: [
    AppRoutingModule,
    MenubarProfessionalComponent,
    MenubarCompanyComponent,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatPaginatorModule,
    SiteLayoutComponent,
    ProfessionalLayoutComponent,
    CompanyLayoutComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorService,
      multi: true
    },
    AdminService,
    AuthService,
    JwtHelperService,
    AuthGuard,
    RoleGuard,
    SiteStorageService,
    WordpressService,
    ToasterService,
    ProfessionalListServices,
    ProfessionalServices,
    CompanyProfileServices,
    CompanyAssessmentService,
    TrackService,
    SkillsService,
    HandleErrorService,
    PreviousRouteService,
    { provide: 'apiKey', useValue: env.LINKED_IN_API_KEY }
  ]
})
export class CoreModule {}
