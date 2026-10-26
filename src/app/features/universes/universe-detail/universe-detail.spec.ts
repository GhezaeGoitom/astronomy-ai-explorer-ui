import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniverseDetail } from './universe-detail';

describe('UniverseDetail', () => {
  let component: UniverseDetail;
  let fixture: ComponentFixture<UniverseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverseDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(UniverseDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
