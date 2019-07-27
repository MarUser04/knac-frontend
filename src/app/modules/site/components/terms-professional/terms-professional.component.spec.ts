import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsProfessionalComponent } from './terms-professional.component';

describe('TermsProfessionalComponent', () => {
  let component: TermsProfessionalComponent;
  let fixture: ComponentFixture<TermsProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsProfessionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
