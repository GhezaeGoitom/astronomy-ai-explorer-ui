import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackHoleForm } from './black-hole-form';

describe('BlackHoleForm', () => {
  let component: BlackHoleForm;
  let fixture: ComponentFixture<BlackHoleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackHoleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BlackHoleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
