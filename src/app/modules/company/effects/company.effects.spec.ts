// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';

// import { Actions } from '@ngrx/effects';

// import { hot, cold } from 'jasmine-marbles';
// import { Observable } from 'rxjs/Observable';
// import { empty } from 'rxjs/observable/empty';
// import { of } from 'rxjs/observable/of';

// import * as fromEffects from './company.effects';
// import * as fromActions from '../actions/company.actions';
// import { CompanyService } from '@app/services/company/company.service';
// import { AdminService } from '@app/services/admin/admin.service';
// import { SiteStorageService } from '@app/services/siteStorage/site-storage.service';
// import { HandleErrorService } from '@app/services/handleError/handleError.service';
// import { ToasterService } from 'angular2-toaster';
// import { Store, StateObservable, State } from '@ngrx/store';
// import { getSiteState } from '@app/modules/site/reducers';
// import { AuthService } from '@app/services/auth/auth.service';

// export class TestActions extends Actions {
//   constructor() {
//     super(empty());
//   }

//   set stream(source: Observable<any>) {
//     this.source = source;
//   }
// }

// export function getActions() {
//   return new TestActions();
// }

// describe('CompanyEffects', () => {
//   let actions$: TestActions;
//   let service: AuthService;
//   let effects: fromEffects.CompanyEffects;

//   const companies = [
//     {
//       name: 'Test',
//       lastName: 'Company',
//       email: 'test@company.com',
//       companyName: 'Company Test',
//       phone: 1234567890,
//       pending: false,
//     },
//     {
//       name: 'Test2',
//       lastName: 'Company2',
//       email: 'test@company.com',
//       companyName: 'Company Test2',
//       phone: 1234567890,
//       pending: false,
//     }
//   ];

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//       ],
//       providers: [
//         AuthService,
//         CompanyService,
//         fromEffects.CompanyEffects,
//         SiteStorageService,
//         HandleErrorService,
//         ToasterService,
//         Store,
//         StateObservable,
//         { provide: Actions, useFactory: getActions },
//       ],
//     });

//     actions$ = TestBed.get(Actions);
//     service = TestBed.get(AuthService);
//     effects = TestBed.get(fromEffects.CompanyEffects);

//     spyOn(service, 'getCurrentProfile').and.returnValue(of(companies));
//     spyOn(service, 'updateCompany').and.returnValue(of(companies[0]));
//   });

//   describe('updateCompany$', () => {
//     it('should updateCompany', () => {
//       const action = new fromActions.UpdateCompany(companies[0]);
//       const completion = new fromActions.UpdateCompany(companies[0]);

//       actions$.stream = hot('-a', { a: action });
//       const expected = cold('-c', { c: completion });

//       expect(effects.updateCompany$).toBeObservable(expected);
//     });
//   });

// });
