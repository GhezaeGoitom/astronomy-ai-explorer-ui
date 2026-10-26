import { TestBed } from '@angular/core/testing';
import { Galaxy } from './galaxy';

describe('Galaxy', () => {
  let service: Galaxy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Galaxy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
