import { TestBed } from '@angular/core/testing';
import { BlackHole } from './black-hole';

describe('BlackHole', () => {
  let service: BlackHole;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackHole);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
