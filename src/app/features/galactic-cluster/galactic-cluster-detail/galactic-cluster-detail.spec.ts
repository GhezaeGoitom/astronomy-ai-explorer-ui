import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalacticClusterDetail } from './galactic-cluster-detail';

describe('GalacticClusterDetail', () => {
  let component: GalacticClusterDetail;
  let fixture: ComponentFixture<GalacticClusterDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalacticClusterDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(GalacticClusterDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
