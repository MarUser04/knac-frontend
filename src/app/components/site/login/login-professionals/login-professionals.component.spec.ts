import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule, FormControl, AbstractControl, FormGroup} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {  RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {LoginProfessionalsComponent} from './login-professionals.component';
import {SiteModule} from '../../../../modules/site/site.module';
import { AuthService } from '../../../../services/auth/auth.service';
import {SiteStorageService} from '../../../../services/siteStorage/site-storage.service';
import { SiteRoutingModule } from '../../../../modules/site/site-routing.module';
import { User } from '../../../../models/user';
import {AuthServiceStub} from '../../../../testing/AuthServiceStub/auth.service.stub';
import { testData } from '../../../../testing/models/testData';
import { NgSpinKitModule } from 'ng-spin-kit';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';
import {AppComponent} from '../../../../app.component';

describe('Login tests', () => {

  let loginProfessionals: LoginProfessionalsComponent;
  let fixture: ComponentFixture<LoginProfessionalsComponent>;
  let email: AbstractControl;
  let password: AbstractControl;
  let f: FormGroup;
  let testAuthService;
  let testSiteStorageService;
  let testToasterService;
  let appComponent;
  let appFixture;
 // let toasterContainer: ToasterContainerComponent;

  const userToBeLoggedIn: User = {
    email: 'test@test.com',
    password: 'Test123*'
  };

  const loginFakeData = {
    password: '1234',
    email: 'test'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        SiteModule,
        RouterTestingModule,
        SiteRoutingModule,
        NgSpinKitModule,
        ToasterModule.forRoot()
      ],
      declarations: [AppComponent],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        SiteStorageService,
        ToasterService
      ]
    });

    fixture = TestBed.createComponent(LoginProfessionalsComponent);
    loginProfessionals = fixture.componentInstance;
    appFixture = TestBed.createComponent(AppComponent);
    appComponent = appFixture.componentInstance;
  //  toasterContainer = fixture.componentInstance;
    loginProfessionals.ngOnInit();

    f = loginProfessionals.f;
    email = f.controls['email'];
    password = loginProfessionals.f.controls['password'];
    testSiteStorageService = TestBed.get(SiteStorageService);
    testAuthService = fixture.debugElement.injector.get(AuthService);
    testToasterService = fixture.debugElement.injector.get(ToasterService);
  });

  it('form invalid when empty', () => {
    expect(f.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue(loginFakeData.email);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    email.setValue(userToBeLoggedIn.email);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue(loginFakeData.password);
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();

    password.setValue(userToBeLoggedIn.password);
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('auth service injected', inject([AuthService], (injectService: AuthService) => {
      expect(injectService).toBe(testAuthService);
    })
  );

  it('sitestorage service injected', inject([SiteStorageService], (injectService: SiteStorageService) => {
      expect(injectService).toBe(testSiteStorageService);
    })
  );

  it('toaster service injected', inject([ToasterService], (injectService: ToasterService) => {
    expect(injectService).toBe(testToasterService);
    })
  );

  // it('login method test', fakeAsync(() => {
  //   const spy = spyOn(testAuthService, 'getLoggingIn').and.returnValue(
  //     Observable.of(testData)
  //   );
  //  // toasterContainer.ngOnInit();
  //   loginProfessionals.login();
  //   fixture.detectChanges();
  //   expect(spy.calls.any()).toEqual(true);
  // }));

});
