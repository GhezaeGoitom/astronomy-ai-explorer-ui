import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarSystemDetail } from './solar-system-detail';

describe('SolarSystemDetail', () => {
  let component: SolarSystemDetail;
  let fixture: ComponentFixture<SolarSystemDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolarSystemDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SolarSystemDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
