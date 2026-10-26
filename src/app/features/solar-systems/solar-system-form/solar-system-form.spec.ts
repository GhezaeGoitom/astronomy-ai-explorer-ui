import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarSystemForm } from './solar-system-form';

describe('SolarSystemForm', () => {
  let component: SolarSystemForm;
  let fixture: ComponentFixture<SolarSystemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolarSystemForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SolarSystemForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
