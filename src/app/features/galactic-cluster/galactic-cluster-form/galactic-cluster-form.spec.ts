import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalacticClusterForm } from './galactic-cluster-form';

describe('GalacticClusterForm', () => {
  let component: GalacticClusterForm;
  let fixture: ComponentFixture<GalacticClusterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalacticClusterForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GalacticClusterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
