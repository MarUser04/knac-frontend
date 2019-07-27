import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';
import { RootRenderer } from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SiteLayoutComponent } from './site-layout.component';
import {MenubarRegisterComponent} from '../../components/site/register/menubar-register/menubar-register.component';
import {AuthService} from '../../services/auth/auth.service';
import {SiteStorageService} from '../../services/siteStorage/site-storage.service';

describe('SiteLayoutComponent testing', () => {
  let component: SiteLayoutComponent;
  let fixture: ComponentFixture<SiteLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLayoutComponent, MenubarRegisterComponent ],
      imports: [ BrowserAnimationsModule, RouterTestingModule ],
      providers: [SiteStorageService, AuthService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
