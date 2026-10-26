import { TestBed } from '@angular/core/testing';
import { Planet } from './planet';

describe('Planet', () => {
  let service: Planet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Planet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
