import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromCompany from '@app/shared/reducers';
import * as professionalActions from '@app/shared/actions/professional-list.actions';
import * as trackActions from '@app/shared/actions/track.actions';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'search-professional',
  templateUrl: './search-professional.component.html',
  styleUrls: ['./search-professional.component.scss']
})
export class SearchProfessionalComponent implements OnInit {
  searchField: FormControl;
  field: FormControl;
  track$: Observable<any>;
  track: FormControl;
  experience: FormControl;

  fields = ['Name', 'Track', 'Location', 'Experience'];
  experiences = ['Beginner', 'Intermediate', 'Experienced', 'Advanced'];

  constructor(private store: Store<fromCompany.SharedState>) {
    this.searchField = new FormControl();
    this.field = new FormControl();
    this.track = new FormControl();
    this.experience = new FormControl();
    this.store.dispatch(new trackActions.GetTrackList());
    this.track$ = this.store.pipe(select(fromCompany.getTrackList));
  }

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(term => {
          if (this.field.value !== null) {
            const payload = {
              term,
              field: this.field.value === 'Name' ? 'fullName' : 'location'
            };
            return of(
              this.store.dispatch(
                new professionalActions.SearchProfessional(payload)
              )
            );
          } else {
            return of(term);
          }
        })
      )
      .subscribe(term => term);
    this.track.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(term => {
          const payload = { term: term || '', field: 'track' };
          return of(
            this.store.dispatch(
              new professionalActions.SearchProfessional(payload)
            )
          );
        })
      )
      .subscribe(term => term);
    this.experience.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(term => {
          const payload = { term: term || '', field: 'experience' };
          return of(
            this.store.dispatch(
              new professionalActions.SearchProfessional(payload)
            )
          );
        })
      )
      .subscribe(term => term);
  }

  showInput() {
    return this.field.value !== 'Track' && this.field.value !== 'Experience';
  }

  showHelper() {
    return this.field.value === null;
  }
}
