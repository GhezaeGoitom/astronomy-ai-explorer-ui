import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarDetail } from './star-detail';

describe('StarDetail', () => {
  let component: StarDetail;
  let fixture: ComponentFixture<StarDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(StarDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
