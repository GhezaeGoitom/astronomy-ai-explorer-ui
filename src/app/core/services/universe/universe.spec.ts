import { TestBed } from '@angular/core/testing';
import { Universe } from './universe';

describe('Universe', () => {
  let service: Universe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Universe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
