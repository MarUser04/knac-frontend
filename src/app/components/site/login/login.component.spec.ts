// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {  RouterTestingModule } from '@angular/router/testing';
// import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
// import { JwtModule } from '@auth0/angular-jwt';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {  ToasterService } from 'angular2-toaster';

// import { LoginComponent } from './login.component';
// import { LoginProfessionalsComponent } from './login-professionals/login-professionals.component';
// import { LoginCompanyComponent } from './login-company/login-company.component';
// import { AuthService } from '../../../services/auth/auth.service';
// import { TokenGetter } from '../../../services/tokenGetter/token-getter';
// import { SharedModule } from '../../../shared/shared.module';
// import {SiteStorageService} from '../../../services/siteStorage/site-storage.service';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ LoginComponent, LoginProfessionalsComponent, LoginCompanyComponent],
//       imports: [ SharedModule, RouterTestingModule, FormsModule, ReactiveFormsModule,  HttpClientTestingModule, BrowserAnimationsModule,
//         JwtModule.forRoot({
//         config: {
//           authScheme: 'bearer ',
//           tokenGetter: TokenGetter.getTokenGetter,
//           whitelistedDomains: [
//             'https://knac-dev-be.herokuapp.com',
//             'https://knac-staging-be.herokuapp.com',
//           ],
//           blacklistedRoutes: [
//             'https://knac-dev-be.herokuapp.com/auth/register',
//             'https://knac-dev-be.herokuapp.com/auth/login',
//             'https://knac-staging-be.herokuapp.com/auth/register',
//             'https://knac-staging-be.herokuapp.com/auth/login',
//           ]
//         }
//       })],
//       providers: [ SiteStorageService, AuthService, JwtHelperService, ToasterService ]

//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
