import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './routes';

const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [ routing ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
