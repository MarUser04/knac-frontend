import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToasterModule } from 'angular2-toaster';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { reducers, metaReducers } from '@app/state';
import { environment as env } from '@app/../environments/environment';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app.routing';
import { CoreModule } from '@app/core/core.module';
import { AppEffects } from '@app/state/app-effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: '[KNAC] Store',
      logOnly: env.production,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    EffectsModule.forRoot([
      AppEffects
    ]),
    CoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ToasterModule.forRoot(),
    LoadingModule.forRoot({
      fullScreenBackdrop: true,
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: '#FFF',
      backdropBorderRadius: '0px',
      primaryColour: '#01DFA5',
    }),
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
