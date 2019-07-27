import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routes } from './routes';

const routing: ModuleWithProviders = RouterModule.forChild( routes );

@NgModule({
  imports: [ routing ],
  exports: [ RouterModule ],
  providers: []
})

export class CompanyRoutingModule {}
