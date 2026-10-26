import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalacticClusterList } from './galactic-cluster-list';

describe('GalacticClusterList', () => {
  let component: GalacticClusterList;
  let fixture: ComponentFixture<GalacticClusterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalacticClusterList],
    }).compileComponents();

    fixture = TestBed.createComponent(GalacticClusterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
