import { TestBed } from '@angular/core/testing';
import { GalacticSupercluster } from './galactic-supercluster';

describe('GalacticSupercluster', () => {
  let service: GalacticSupercluster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalacticSupercluster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
