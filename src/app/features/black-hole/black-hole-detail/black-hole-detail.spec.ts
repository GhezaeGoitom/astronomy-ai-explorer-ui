import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackHoleDetail } from './black-hole-detail';

describe('BlackHoleDetail', () => {
  let component: BlackHoleDetail;
  let fixture: ComponentFixture<BlackHoleDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackHoleDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BlackHoleDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
