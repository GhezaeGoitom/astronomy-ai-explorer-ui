import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalacticSuperclusterList } from './galactic-supercluster-list';

describe('GalacticSuperclusterList', () => {
  let component: GalacticSuperclusterList;
  let fixture: ComponentFixture<GalacticSuperclusterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalacticSuperclusterList],
    }).compileComponents();

    fixture = TestBed.createComponent(GalacticSuperclusterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
