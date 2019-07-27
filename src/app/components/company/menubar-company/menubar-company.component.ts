import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../services/auth/auth.service';
import * as AppActionTypes from '@app/state/app-actions';
import * as appReducer from '@app/reducers';
import * as CompanyProfileActions from '@app/modules/company/actions/company.actions';
import * as fromCompany from '@app/modules/company/reducers';
import * as CompanyProfileActionsShared from '@app/shared/actions/company-profile.actions';

@Component({
  selector: 'cmp-menubar-company',
  templateUrl: './menubar-company.component.html',
  styleUrls: ['./menubar-company.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)'
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(0, -100%, 0)',
          display: 'none'
        })
      ),
      state(
        'closeSlide',
        style({
          transform: 'translate3d(0, 0, 0)'
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
      transition('out => closeSlide', animate('0.5ms ease-in-out'))
    ])
  ]
})
export class MenubarCompanyComponent implements OnInit {
  public menuState;
  public isMobile;
  public isHidden;
  public isOpen;
  public panelStatus;

  contactName = 'Loading...';
  logo = 'Loading...';
  website = 'Loading...';


  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<fromCompany.CompanyState>
  ) {
    // store
    //   .select(fromCompany.getProfile)
    //   .subscribe(profile => (this.company = profile));
  }

  ngOnInit() {
    this.getCurrentUser();
    this.menuState = window.innerWidth > 800 ? 'in' : 'out';
    this.isMobile = window.innerWidth <= 800 ? true : false;
    this.isOpen = false;
    if (this.isOpen) {
      this.panelStatus = 'showPanel';
    } else {
      this.panelStatus = 'hiddenPanel';
    }
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.menuState = 'closeSlide';
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.menuState = 'out';
      this.isMobile = true;
    }
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toggleClose() {
    if (this.isMobile) {
      this.menuState = 'out';
    }
  }

  togglePanel() {
    this.isOpen = this.isOpen ? false : true;
    if (this.isOpen) {
      this.panelStatus = 'showPanel';
    } else {
      this.panelStatus = 'hiddenPanel';
    }
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  clickedOutside($event) {
    if (window.innerWidth <= 800) {
      this.menuState = 'out';
    }
  }

  logout(e) {
    e.preventDefault();
    this.auth.logout();
    this.store.dispatch<AppActionTypes.Logout>(new AppActionTypes.Logout());
    this.router.navigate(['/home/login']);
    this.store.dispatch(new CompanyProfileActionsShared.ShowSnackBar());
  }

  getCurrentUser() {
    this.auth.getCurrentProfile('/companies/profile').subscribe({
      next: resp => {
        const { profile } = resp;
        this.contactName = profile && profile.contactName;
        this.logo = profile && profile.logo;
        this.website = profile && profile.websiteUrl;
        // if (!profile) {
        //   this.toast.pop(warnToast('build your profile first, please!'));
        //   this.router.navigate(['/professional/profile']);
        // } else {
        //   this.currentProfile = profile;
        //   // const payload = { name: 'currentProfile', value: profile };
        //   // this.storage.saveOnStorage(payload);
        // }
      },
      error: (err: HttpErrorResponse) => {
        const { error } = err;
        // this.toast.pop(errorToast('please reload!'));
      }
    });
  }
}
