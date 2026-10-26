import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupernovaForm } from './supernova-form';

describe('SupernovaForm', () => {
  let component: SupernovaForm;
  let fixture: ComponentFixture<SupernovaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupernovaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SupernovaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
