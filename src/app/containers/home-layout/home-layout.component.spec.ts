import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeLayoutComponent } from './home-layout.component';
import { MenubarHomeComponent } from '../../components/home/menubar-home/menubar-home.component';
import {SharedModule} from '../../shared/shared.module';
import {AuthService} from '../../services/auth/auth.service';
import {SiteStorageService} from '../../services/siteStorage/site-storage.service';

describe('HomeLayoutComponent testing', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLayoutComponent, MenubarHomeComponent ],
      imports: [ BrowserAnimationsModule, SharedModule, RouterTestingModule ],
      providers: [AuthService, SiteStorageService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
