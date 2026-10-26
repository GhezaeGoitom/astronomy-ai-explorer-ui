import { TestBed } from '@angular/core/testing';
import { SolarSystem } from './solar-system';

describe('SolarSystem', () => {
  let service: SolarSystem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolarSystem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
