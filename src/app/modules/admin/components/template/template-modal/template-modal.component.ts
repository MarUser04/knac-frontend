import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Template } from '@app/modules/admin/models/template';

@Component({
  selector: 'adm-template-form',
  templateUrl: './template-modal.component.html',
  styleUrls: ['./template-modal.component.css']
})
export class TemplateModalComponent implements OnInit {
  @Input() type: string;
  @Input()
  set template(template) {
    if (template) {
      this.f.patchValue(template);
    }
  }

  @Input()
  set setLoading(isLoading: boolean) {
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

  @Output() submitted: EventEmitter<Template> = new EventEmitter<Template>();

  public f: FormGroup;
  private textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
  public loading: boolean;

  constructor(private builder: FormBuilder) {
    this.f = this.builder.group({
      _id: [''],
      name: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

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

  get content(): AbstractControl {
    return this.f.get('content');
  }

  public inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
