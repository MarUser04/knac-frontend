import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
  inject
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { ProfessionalModule } from '../../../modules/professional/professional.module';
import { CoreModule } from '../../../core/core.module';
import { SiteStorageService } from '../../../services/siteStorage/site-storage.service';
import { User } from '../../../models/user';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let testSiteStorageService;

  const mockUser = {
    name: '',
    email: ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProfessionalModule],
      providers: [SiteStorageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    testSiteStorageService = TestBed.get(SiteStorageService);
    spyOn(component, 'ngOnInit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'sitestorage service injected',
    inject([SiteStorageService], (injectService: SiteStorageService) => {
      expect(injectService).toBe(testSiteStorageService);
    })
  );
});
