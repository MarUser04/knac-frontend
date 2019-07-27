import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Track } from '@app/modules/admin/models/track';

@Component({
  selector: 'adm-track-form',
  templateUrl: './track-modal.component.html',
  styleUrls: ['./track-modal.component.css']
})
export class TrackModalComponent implements OnInit {
  @Input() type: string;
  @Input() set track(track) {
    if (track) {
      this.f.patchValue(track);
    }
  }

  @Input() set setLoading(isLoading: boolean) {
    if (isLoading) {
      this.f.disable();
      // this.loading = true;
    } else {
      this.f.enable();
      if (this.type === 'Create' && this.loading) {
        this.formUpdate.resetForm();
      }
      // this.loading = false;
    }
    this.loading = isLoading;
  }

  @ViewChild('formUpdate') formUpdate;

  @Output() submitted: EventEmitter<Track> = new EventEmitter<Track>();

  public f: FormGroup;
  private textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
  public loading: boolean;

  constructor(private builder: FormBuilder) {
    this.f = this.builder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.pattern(this.textPattern)]],
    });
  }

  ngOnInit() {
  }

  // ngOnChanges() {
  //   this.f.patchValue(this.track);
  // }

  public submit() {
    if (this.f.valid) {
      this.submitted.emit(this.f.value);
    }
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }

  public inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

}
