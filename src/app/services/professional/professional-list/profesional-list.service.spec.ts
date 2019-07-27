/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfessionalListServices } from './profesional-list.service';

describe('Service: ProfesionalList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessionalListServices]
    });
  });

  it('should ...', inject([ProfessionalListServices], (service: ProfessionalListServices) => {
    expect(service).toBeTruthy();
  }));
});
