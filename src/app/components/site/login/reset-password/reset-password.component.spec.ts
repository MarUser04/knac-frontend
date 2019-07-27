import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterTestingModule } from '@angular/router/testing';
import { ToasterService } from 'angular2-toaster';

import { ResetPasswordComponent } from './reset-password.component';
import {SiteModule} from '../../../../modules/site/site.module';
import { AuthService } from '../../../../services/auth/auth.service';
import {SiteStorageService} from '../../../../services/siteStorage/site-storage.service';
import { SiteRoutingModule } from '../../../../modules/site/site-routing.module';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SiteModule,
        SiteRoutingModule
      ],
      providers: [ AuthService, SiteStorageService, ToasterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
