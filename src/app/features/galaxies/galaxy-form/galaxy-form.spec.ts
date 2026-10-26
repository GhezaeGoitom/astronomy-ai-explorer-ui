import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalaxyForm } from './galaxy-form';

describe('GalaxyForm', () => {
  let component: GalaxyForm;
  let fixture: ComponentFixture<GalaxyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalaxyForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GalaxyForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
