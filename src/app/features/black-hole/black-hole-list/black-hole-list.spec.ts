import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackHoleList } from './black-hole-list';

describe('BlackHoleList', () => {
  let component: BlackHoleList;
  let fixture: ComponentFixture<BlackHoleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackHoleList],
    }).compileComponents();

    fixture = TestBed.createComponent(BlackHoleList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
