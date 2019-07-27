import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileContainerComponent } from './update-profile-container.component';

describe('UpdateProfileContainerComponent', () => {
  let component: UpdateProfileContainerComponent;
  let fixture: ComponentFixture<UpdateProfileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
