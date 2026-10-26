import { TestBed } from '@angular/core/testing';
import { GalacticCluster } from './galactic-cluster';

describe('GalacticCluster', () => {
  let service: GalacticCluster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalacticCluster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
