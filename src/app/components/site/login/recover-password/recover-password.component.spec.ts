import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule, FormControl, AbstractControl, FormGroup} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';
import { ToasterService } from 'angular2-toaster';

import {SiteModule} from '../../../../modules/site/site.module';
import { AuthService } from '../../../../services/auth/auth.service';
import {SiteStorageService} from '../../../../services/siteStorage/site-storage.service';
import { SiteRoutingModule } from '../../../../modules/site/site-routing.module';
import { User } from '../../../../models/user';
import {RecoverPasswordComponent} from './recover-password.component';

describe('Recover Password tests', () => {
  let recoverPassword: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  let email: AbstractControl;
  let f: FormGroup;

  const userToBeRecoverPasswordIn = {
    email: 'test@test.com'
  };

  const recoverPasswordFakeData = {
    email: 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SiteModule,
        SiteRoutingModule
      ],
      providers: [ AuthService, SiteStorageService, ToasterService]
    });

    fixture = TestBed.createComponent(RecoverPasswordComponent);
    recoverPassword = fixture.componentInstance;
    recoverPassword.ngOnInit();
    f = recoverPassword.f;
    email = f.controls['email'];
  }));

  it('form invalid when empty', () => {
    expect(f.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue(recoverPasswordFakeData.email);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    email.setValue(userToBeRecoverPasswordIn.email);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

});
