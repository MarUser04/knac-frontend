import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';

import { ProfessionalsListComponent } from './professionals-list.component';
import {SharedModule} from '../../../shared/shared.module';

describe('ProfessionalsListComponent', () => {
  let component: ProfessionalsListComponent;
  let fixture: ComponentFixture<ProfessionalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsListComponent ],
      imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
