import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalacticSuperclusterForm } from './galactic-supercluster-form';

describe('GalacticSuperclusterForm', () => {
  let component: GalacticSuperclusterForm;
  let fixture: ComponentFixture<GalacticSuperclusterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalacticSuperclusterForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GalacticSuperclusterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
