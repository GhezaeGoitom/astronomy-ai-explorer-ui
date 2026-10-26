import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalacticSuperclusterDetail } from './galactic-supercluster-detail';

describe('GalacticSuperclusterDetail', () => {
  let component: GalacticSuperclusterDetail;
  let fixture: ComponentFixture<GalacticSuperclusterDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalacticSuperclusterDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(GalacticSuperclusterDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
