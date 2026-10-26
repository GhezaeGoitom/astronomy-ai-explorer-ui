import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarSystemList } from './solar-system-list';

describe('SolarSystemList', () => {
  let component: SolarSystemList;
  let fixture: ComponentFixture<SolarSystemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolarSystemList],
    }).compileComponents();

    fixture = TestBed.createComponent(SolarSystemList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
