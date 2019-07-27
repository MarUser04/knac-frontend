import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSetupContainerComponent } from './password-setup-container.component';

describe('PasswordSetupContainerComponent', () => {
  let component: PasswordSetupContainerComponent;
  let fixture: ComponentFixture<PasswordSetupContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordSetupContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSetupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
