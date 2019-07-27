import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SharedModule } from '../../shared/shared.module';
import { ContentRoutingModule } from './content-routing.module';
// Components


@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    FlexLayoutModule,
    LoadingBarHttpClientModule
  ],
  declarations: [
  ]
})
export class ContentModule { }
