import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniverseForm } from './universe-form';

describe('UniverseForm', () => {
  let component: UniverseForm;
  let fixture: ComponentFixture<UniverseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverseForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UniverseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
