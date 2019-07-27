// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {  RouterTestingModule } from '@angular/router/testing';

// import { HomeComponent } from './home.component';
// import {CompanyModule} from '../../../modules/company/company.module';
// import { SiteStorageService } from '../../../services/siteStorage/site-storage.service';
// import {User} from '../../../models/user';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   const mockUser = {
//     name: '',
//     email: ''
//   };

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [CompanyModule],
//       providers: [SiteStorageService]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     spyOn(component, 'ngOnInit');
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should handle currentUser', () => {
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(component.currentUser).toEqual(mockUser);
//   });
// });
