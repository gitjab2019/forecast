import { TestBed } from '@angular/core/testing';

import { SeleccionDiaService } from './seleccion-dia.service';

describe('SeleccionDiaService', () => {
  let service: SeleccionDiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleccionDiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
