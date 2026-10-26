import { TestBed } from '@angular/core/testing';
import { Supernova } from './supernova';

describe('Supernova', () => {
  let service: Supernova;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supernova);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
