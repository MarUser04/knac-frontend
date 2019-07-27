import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', component:  },
    ]
  }
];

const routing: ModuleWithProviders = RouterModule.forChild( routes );

@NgModule({
  imports: [ routing ],
  exports: [ RouterModule ]
})

export class ContentRoutingModule {}
