import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Track } from '@app/modules/admin/models/track';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  @Input() loading: boolean;
  @Input() tracks: Track[];

  @Output() create: EventEmitter<Track> = new EventEmitter<Track>();
  @Output() update: EventEmitter<Track> = new EventEmitter<Track>();
  @Output() delete: EventEmitter<Track> = new EventEmitter<Track>();

  public filterQuery: string = String();
  public sortBy = 'name';
  public sortOrder = 'asc';
  public item: Track;
  public showCreate = false;
  public showUpdate = false;
  public option;

  track: Track = {
    _id: '',
    name: ''
  };

  public cols: any = [
    { field: 'name', header: 'Name' },
    { field: 'action', header: 'Actions' }
  ];

  constructor() {}

  ngOnInit() {}

  @Input()
  set modalCreate(isModal: boolean) {
    if (!isModal) {
      this.showCreate = false;
    }
  }

  @Input()
  set modalUpdate(isModal: boolean) {
    if (!isModal) {
      this.showUpdate = false;
    }
  }

  createTrack(track: Track) {
    this.create.emit(track);
  }

  onUpdateTrack(track: Track) {
    this.update.emit(track);
  }

  setForm(item: Track) {
    this.track = item;
  }

  trackTrack(index, track) {
    return track ? track._id : index;
  }

  deleteTrackById(item: Track) {
    this.delete.emit(item);
  }

  public get totalRecords() {
    return this.tracks.length;
  }
}
