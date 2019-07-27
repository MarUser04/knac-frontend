import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';

import { SiteStorageService } from '../../../services/siteStorage/site-storage.service';
import { Profile } from '../../../models/profile';
import { AuthService } from '../../../services/auth/auth.service';
import { errorToast, warnToast } from '../../../helpers/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'prf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentProfile: Profile = {
    name: '...',
    lastName: '',
    email: ''
  };

  constructor(
    private storage: SiteStorageService,
    private auth: AuthService,
    private toast: ToasterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.auth.getCurrentProfile('/professionals/profile')
      .subscribe({
        next: (resp) => {
          const { profile } = resp;
          if (!profile) {
            this.toast.pop(warnToast('build your profile first, please!'));
            this.router.navigate(['/professional/profile']);
          } else {
            this.currentProfile = profile;
            // const payload = { name: 'currentProfile', value: profile };
            // this.storage.saveOnStorage(payload);
          }
        },
        error: (err: HttpErrorResponse) => {
          const { error } = err;
          this.toast.pop(errorToast('please reload!'));
        }
      });
  }

}
