import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupernovaDetail } from './supernova-detail';

describe('SupernovaDetail', () => {
  let component: SupernovaDetail;
  let fixture: ComponentFixture<SupernovaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupernovaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SupernovaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
