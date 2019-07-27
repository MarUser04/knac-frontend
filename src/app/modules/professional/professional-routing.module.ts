import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentGuard } from '@app/modules/professional/guard/assessment.guard';

import { routes } from './routes';

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule],
  providers: [AssessmentGuard]
})
export class ProfessionalRoutingModule {}
