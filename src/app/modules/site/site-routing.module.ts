import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {routes} from './routes';
import { AuthLinkedinResolverService } from '../../services/resolvers/auth-linkedin/auth-linkedin-resolver.service';

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [ routing ],
  exports: [ RouterModule ],
  providers: [ AuthLinkedinResolverService ]
})

export class SiteRoutingModule {}
