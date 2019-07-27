import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { Template } from '@app/modules/admin/models/template';

@Component({
  selector: 'adm-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  @Input() loading: boolean;
  @Input() templates: Template[];

  @Output() create: EventEmitter<Template> = new EventEmitter<Template>();
  @Output() update: EventEmitter<Template> = new EventEmitter<Template>();
  @Output() delete: EventEmitter<Template> = new EventEmitter<Template>();

  public filterQuery: string = String();
  public sortBy = 'name';
  public sortOrder = 'asc';
  public item: Template;
  public showCreate = false;
  public showUpdate = false;
  public option;

  template: Template = {
    _id: '',
    name: '',
    content: ''
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

  createTemplate(template: Template) {
    this.create.emit(template);
  }

  onUpdateTemplate(skill: Template) {
    this.update.emit(skill);
  }

  setForm(item: Template) {
    this.template = item;
  }

  templateTemplate(index, template) {
    return template ? template._id : index;
  }

  deleteTemplateById(item: Template) {
    this.delete.emit(item);
  }

  public get totalRecords() {
    return this.templates.length;
  }
}
