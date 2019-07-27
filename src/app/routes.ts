import { Routes, CanActivateChild } from '@angular/router';
import { SiteLayoutComponent } from './containers/site-layout/site-layout.component';
import { CompanyLayoutComponent } from './containers/company-layout/company-layout.component';
import { ProfessionalLayoutComponent } from './containers/professional-layout/professional-layout.component';
import { AdminLayoutComponent } from '@app/containers/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from '@app/containers/home-layout/home-layout.component';
import { AuthGuardService as AuthGuard } from '@app/services/auth/auth-guard.service';

import { RoleGuardService as RoleGuard } from '@app/services/auth/role-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: '@app/modules/home/home.module#HomeModule'
      }
    ]
  },
  {
    path: 'home',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: '@app/modules/site/site.module#SiteModule'
      }
    ]
  },
  {
    path: 'company',
    component: CompanyLayoutComponent,
    canActivateChild: [RoleGuard],
    data: {
      expectedRole: [10, 19]
    },
    children: [
      {
        path: '',
        loadChildren: '@app/modules/company/company.module#CompanyModule'
      }
    ]
  },
  {
    path: 'professional',
    component: ProfessionalLayoutComponent,
    canActivateChild: [RoleGuard],
    data: {
      expectedRole: [0, 9]
    },
    children: [
      {
        path: '',
        loadChildren:
          '@app/modules/professional/professional.module#ProfessionalModule'
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivateChild: [RoleGuard],
    data: {
      expectedRole: [20, 99]
    },
    children: [
      {
        path: '',
        loadChildren: '@app/modules/admin/admin.module#AdminModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
