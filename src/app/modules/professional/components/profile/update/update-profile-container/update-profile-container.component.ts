import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Profile } from '@app/modules/professional/models/profile';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAssessment from '@app/shared/reducers';
import * as fromProfile from '@app/modules/professional/reducers';
import * as TrackActions from '@app/shared/actions/track.actions';
import * as ProfileActions from '../../../../actions/profile.actions';
import { UpdateProfile } from '@app/modules/professional/actions/profile.actions';
import { Track } from '@app/shared/models/track';
import * as skillActions from '@app/modules/professional/actions/skill.actions';
import * as fromSkills from '@app/modules/professional/reducers';
import { Skill } from '@app/modules/professional/models/skill';
import { bodyParserToAllowSpaces } from '@app/helpers/helper';

@Component({
  selector: 'app-update-profile-container',
  template: `
    <update-profile
      [profile]="profile$ | async"
      [tracks]="tracks$ | async"
      [skills]="skills$ | async"
      [disabled]="pending$ | async"
      (submitted)="onUpdateProfile($event)"
    ></update-profile>
  `,
  styleUrls: ['./update-profile-container.component.css']
})
export class UpdateProfileContainerComponent implements OnInit {
  pending$: Observable<boolean>;
  profile$: Observable<Profile>;
  tracks$: Observable<Track>;
  skills$: Observable<any>;

  constructor(private store: Store<fromProfile.State>) {
    store.dispatch(new ProfileActions.GetProfile());
    store.dispatch(new skillActions.GetSkills());
    store.dispatch(new TrackActions.GetTrackList());

    this.pending$ = store.pipe(select(fromProfile.getProfilePending));
    this.profile$ = store.pipe(select(fromProfile.getProfile));
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
    this.skills$ = store.pipe(select(fromSkills.getSkills));
  }

  ngOnInit() {}

  onUpdateProfile(profile: Profile) {
    const profileParsed = bodyParserToAllowSpaces(profile);
    this.store.dispatch(new UpdateProfile(profileParsed));
  }
}
