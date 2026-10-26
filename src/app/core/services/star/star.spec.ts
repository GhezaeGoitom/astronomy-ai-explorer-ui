import { TestBed } from '@angular/core/testing';
import { Star } from './star';

describe('Star', () => {
  let service: Star;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Star);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
