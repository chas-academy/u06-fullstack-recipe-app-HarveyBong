import { TestBed } from '@angular/core/testing';

import { EdamamService } from './edamam.service';

describe('EdamamService', () => {
  let service: EdamamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdamamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
