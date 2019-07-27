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
import { Skill } from '@app/modules/admin/models/skill';

@Component({
  selector: 'adm-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() loading: boolean;
  @Input() skills: Skill[];

  @Output() create: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() update: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() delete: EventEmitter<Skill> = new EventEmitter<Skill>();

  public filterQuery: string = String();
  public sortBy = 'name';
  public sortOrder = 'asc';
  public item: Skill;
  public showCreate = false;
  public showUpdate = false;
  public option;

  skill: Skill = {
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

  createSkill(skill: Skill) {
    this.create.emit(skill);
  }

  onUpdateSkill(skill: Skill) {
    this.update.emit(skill);
  }

  setForm(item: Skill) {
    this.skill = item;
  }

  skillSkill(index, skill) {
    return skill ? skill._id : index;
  }

  deleteSkillById(item: Skill) {
    this.delete.emit(item);
  }

  public get totalRecords() {
    return this.skills.length;
  }
}
